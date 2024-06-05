import express from 'express';
import { userLogin } from '../controllers/login.controller';

const loginRouter = express.Router();

// User login route
loginRouter.post('/', async (req, res, next) => {
    try {
        await userLogin(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default loginRouter;
