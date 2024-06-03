import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const userSignup = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({ status: "Error", message: "User Already Exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();

        if (newUser._id) {
            const token = jwt.sign(
                { userId: newUser.id },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: '1d' }
            );

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: false,
                maxAge: 86400000
            });

            return res.status(201).json({ status: "Success", message: "User Created!" });
        }
    } catch (error) {
        console.error("User creation error:", error);
        return res.status(500).json({ status: "Server Error", message: "User Creation Failed!" });
    }
}
