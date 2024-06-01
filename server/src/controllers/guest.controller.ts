import { Request, Response } from "express";

export const loadGuestHome = async (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
};

export const generatePassword = async (req: Request, res: Response) => {
    try {
        const { passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols } = req.body;        
        let str = '';

        if (includeLowercase) { str += "abcdefghijklmnopqrstuvwxyz"; }
        if (includeUppercase) { str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; }
        if (includeNumbers) { str += "012345678901234567890123456789"; }
        if (includeSymbols) { str += '!@#$%^&*_-+=?/|\~`:;%^&*_-+=?/'; }

        const array = [...str];

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        let newPassword = '';
        for (let i = passwordLength - 1; i > 0; i--) {
            newPassword += array[i];
        }

    } catch (error) {

    }
};