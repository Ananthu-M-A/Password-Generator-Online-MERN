import mongoose from "mongoose";

const passwordsSchema = new mongoose.Schema({

});

const Passwords = mongoose.model('Passwords', passwordsSchema);
export default Passwords;