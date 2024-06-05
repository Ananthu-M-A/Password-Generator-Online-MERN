import { Request, Response, NextFunction } from "express";
import Passwords from "../models/passwords.model";
import '../interfaces/session.interface';

// Save Password
export const savePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { passwordData } = req.body;
        const { newPassword, passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = passwordData;

        const existing = await Passwords.findOne({ userId: req.userId, password: newPassword });
        if (existing) {
            return res.status(409).json({ status: "Error", message: "Password already saved" });
        }

        const savePswdData = new Passwords({
            userId: req.userId,
            password: newPassword,
            criteria: { passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols },
            createdAt: new Date()
        });

        await savePswdData.save();
        return res.status(201).json({ status: "Success", message: "Password saved" });
    } catch (error) {
        console.error("Error saving password:", error);
        next(error);
    }
};

// Load Passwords
export const loadPasswords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const start = (page - 1) * limit;

        const passwords = await Passwords.find({ userId: req.userId }).skip(start).limit(limit);
        const totalCount = await Passwords.countDocuments({ userId: req.userId });

        return res.status(200).json({
            status: "Success",
            message: "Passwords loaded",
            totalCount,
            passwords,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        });
    } catch (error) {
        console.error("Error loading passwords:", error);
        next(error);
    }
};

// Delete Password
export const deletePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password } = req.body;
        const deletePswd = await Passwords.deleteOne({ password, userId: req.userId });
        if (deletePswd) {
            res.status(201).json({ status: "Success", message: "Password deleted" })
        }
    } catch (error) {
        console.error("Error deleting password:", error);
        next(error);
    }
}

// User Authorization
export const userAuthorization = (req: Request, res: Response) => {
    try {
        res.status(200).json({ userId: req.userId });
    } catch (error) {
        console.error("Error authorizing user", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

// Logout User
export const logoutUser = (req: Request, res: Response) => {
    try {
        res.cookie("auth_token", "", { expires: new Date(0), httpOnly: true, secure: true });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in user logout", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};
