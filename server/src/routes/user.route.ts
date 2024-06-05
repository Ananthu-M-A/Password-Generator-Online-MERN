import express from 'express'
import { loadPasswords, logoutUser, savePassword, userAuthorization } from '../controllers/user.controller';
import verifyToken from '../middlewares/auth.middlewares';

const userRouter = express.Router();

userRouter.get('/validate-token', verifyToken, userAuthorization)
userRouter.post('/save-password', savePassword)
userRouter.get('/saved-passwords', loadPasswords)
userRouter.post('/logout', logoutUser)

export default userRouter