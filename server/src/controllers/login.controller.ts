import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: "Error", message: "User Not Found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "Error", message: "Password Incorrect!" });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '1d' }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        });

        return res.status(201).json({ status: "Success", message: "User Logged In!" });

    } catch (error) {
        console.error("User Logging In Failed!", error);
        return res.status(500).json({ status: "Server Error", message: "User Logging In Failed!" });
    }
}