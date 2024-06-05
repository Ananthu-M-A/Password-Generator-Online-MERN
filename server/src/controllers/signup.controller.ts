import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";

// User Signup
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "Error", message: errors.array() })
        }

        const { fullName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ status: "Error", message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: hashedPassword });

        await newUser.save();

        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' });
        res.cookie("auth_token", token, { httpOnly: true, secure: true, maxAge: 86400000 });

        return res.status(201).json({ status: "Success", message: "User created!" });
    } catch (error) {
        console.error("User creation error:", error);
        next(error);
    }
};
