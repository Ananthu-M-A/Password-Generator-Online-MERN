import express from 'express';
import { generatePassword } from '../controllers/guest.controller';

const guestRouter = express.Router();

// Generate password route
guestRouter.post('/generate-password', async (req, res, next) => {
    try {
        await generatePassword(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default guestRouter;
