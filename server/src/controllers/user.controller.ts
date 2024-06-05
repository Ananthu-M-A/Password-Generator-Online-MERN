import { Request, Response } from "express";
import Passwords from "../models/passwords.model";
import '../interfaces/session.interface'

export const savePassword = async (req: Request, res: Response) => {
    try {
        const { passwordData } = req.body;
        const { newPassword,
            passwordLength,
            includeUppercase,
            includeLowercase,
            includeNumbers,
            includeSymbols }
            = passwordData;

        const existing = await Passwords.findOne({ userId: req.userId, password: newPassword })
        if (existing) {
            return res.status(409).json({ status: "Error", message: "Password already saved" })
        }

        const savePswdData = new Passwords({
            userId: req.userId,
            password: newPassword,
            criteria: {
                passwordLength,
                includeUppercase,
                includeLowercase,
                includeNumbers,
                includeSymbols,
            },
            createdAt: new Date()
        });
        const saved = await savePswdData.save();
        return res.status(201).json({ status: "Success", message: "Password saved" })
    } catch (error) {
        console.log("Error saving password:", error);
        return res.status(500).json({ status: "Error", message: "Error saving password" })
    }
};

export const loadPasswords = async (req: Request, res: Response) => {
    try {
        const passwords = await Passwords.find({userId: req.userId}).limit(10);
        return res.status(201).json({ status: "Success", message: "Password loaded", passwords })
    } catch (error) {
        console.log("Error loading passwords:", error);
        return res.status(500).json({ status: "Error", message: "Error loading passwords" })
    }
};

export const userAuthorization = (req: Request, res: Response) => {
    try {
        res.status(200).send({ userId: req.userId });
    } catch (error) {
        console.log("Error authorizing user", error);
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

export const logoutUser = (req: Request, res: Response) => {
    try {
        res.cookie("auth_token", "", {
            expires: new Date(0),
        });
        res.send();
    } catch (error) {
        console.log("Error in user logout", error);
        return res.status(500).send({ message: "Something went wrong!" });
    }
};