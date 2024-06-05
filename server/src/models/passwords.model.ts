import mongoose from "mongoose";
import { PasswordType } from "../types/Types";

const passwordsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    password: { type: String, required: true, unique: true },
    criteria: {
        passwordLength: { type: Number, required: true },
        includeUppercase: { type: Boolean, required: true },
        includeLowercase: { type: Boolean, required: true },
        includeNumbers: { type: Boolean, required: true },
        includeSymbols: { type: Boolean, required: true },
    },
    createdAt: { type: Date, default: Date.now }
});

passwordsSchema.index({ userId: 1 });

const Passwords = mongoose.model<PasswordType>('Passwords', passwordsSchema);
export default Passwords;