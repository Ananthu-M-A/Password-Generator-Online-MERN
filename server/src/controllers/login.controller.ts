import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User Login
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "Error", message: "Password incorrect!" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' });
        res.cookie("auth_token", token, { httpOnly: true, secure: true, maxAge: 86400000 });

        return res.status(200).json({ status: "Success", message: "User logged in!" });
    } catch (error) {
        console.error("User login failed!", error);
        next(error);
    }
};
