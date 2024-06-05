import express from 'express';
import { deletePassword, loadPasswords, logoutUser, savePassword, userAuthorization } from '../controllers/user.controller';
import verifyToken from '../middlewares/auth.middlewares';

const userRouter = express.Router();

// Validate token route
userRouter.get('/validate-token', verifyToken, (req, res, next) => {
    try {
        userAuthorization(req, res);
    } catch (error) {
        next(error);
    }
});

// Save password route
userRouter.post('/save-password', verifyToken, async (req, res, next) => {
    try {
        await savePassword(req, res, next);
    } catch (error) {
        next(error);
    }
});

// Load saved passwords route
userRouter.get('/saved-passwords', verifyToken, async (req, res, next) => {
    try {
        await loadPasswords(req, res, next);
    } catch (error) {
        next(error);
    }
});

// Delete password
userRouter.put('/saved-passwords', verifyToken, async (req, res, next) => {
    try {
        await deletePassword(req, res, next);
    } catch (error) {
        next(error)
    }
})

// Logout route
userRouter.post('/logout', async (req, res, next) => {
    try {
        await logoutUser(req, res);
    } catch (error) {
        next(error);
    }
});

export default userRouter;
