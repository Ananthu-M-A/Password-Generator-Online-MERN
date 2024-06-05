import express, { NextFunction, Request, Response } from 'express';
import { userSignup } from '../controllers/signup.controller';
import { validateSignup } from '../utils/FormValidator';

const signupRouter = express.Router();

// User signup route
signupRouter.post('/', validateSignup, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userSignup(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default signupRouter;
