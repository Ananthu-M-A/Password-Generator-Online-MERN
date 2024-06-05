import express from 'express';
import { userSignup } from '../controllers/signup.controller';

const signupRouter = express.Router();

// User signup route
signupRouter.post('/', async (req, res, next) => {
    try {
        await userSignup(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default signupRouter;
