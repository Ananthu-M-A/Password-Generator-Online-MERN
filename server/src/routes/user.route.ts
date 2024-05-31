import express from 'express'
import { generatePassword, loadPasswords, loadUserHome, logoutUser, savePassword } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/:userId', loadUserHome)
userRouter.post('/:userId/generate-password', generatePassword)
userRouter.post('/:userId/save-password', savePassword)
userRouter.get('/:userId/saved-passwords', loadPasswords)
userRouter.post('/:userId/logout', logoutUser)

export default userRouter