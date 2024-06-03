import express from 'express'
import { userLogin } from '../controllers/login.controller';

const loginRouter = express.Router();

loginRouter.post('/', userLogin)

export default loginRouter