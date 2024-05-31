import express from 'express'
import { loadSignupPage, userSignup } from '../controllers/signup.controller';

const signupRouter = express.Router();

signupRouter.get('/', loadSignupPage)
signupRouter.post('/', userSignup)

export default signupRouter