import { Request, Response, NextFunction } from "express";

// Generate Password
export const generatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols } = req.body;
        let str = '';

        if (includeLowercase) { str += "abcdefghijklmnopqrstuvwxyz"; }
        if (includeUppercase) { str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; }
        if (includeNumbers) { str += "0123456789"; }
        if (includeSymbols) { str += '!@#$%^&*_-+=?/|~`:'; }

        const array = str.split('');

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        const newPassword = array.slice(0, passwordLength).join('');
        res.status(200).json({ status: "Success", message: "New Password Generated!", newPassword });
    } catch (error) {
        console.error("Error generating password:", error);
        next(error);
    }
};
