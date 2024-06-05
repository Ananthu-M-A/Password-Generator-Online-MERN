import mongoose from "mongoose";
import { UserType } from "../types/Types";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.index({ email: 1 });

const User = mongoose.model<UserType>("User", userSchema)
export default User;