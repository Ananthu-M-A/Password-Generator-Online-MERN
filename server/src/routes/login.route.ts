import express, { NextFunction, Request, Response } from 'express';
import { userLogin } from '../controllers/login.controller';
import { validateLogin } from '../utils/FormValidator';

const loginRouter = express.Router();

// User login route
loginRouter.post('/',validateLogin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userLogin(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default loginRouter;
