import express from 'express'
import { userSignup } from '../controllers/signup.controller';

const signupRouter = express.Router();

signupRouter.post('/', userSignup)

export default signupRouter