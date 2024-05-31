import express from 'express'
import { loadLoginPage, userLogin } from '../controllers/login.controller';

const loginRouter = express.Router();

loginRouter.get('/', loadLoginPage)
loginRouter.post('/', userLogin)

export default loginRouter