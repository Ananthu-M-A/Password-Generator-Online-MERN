import express from 'express'
import { generatePassword, loadGuestHome } from '../controllers/guest.controller';

const guestRouter = express.Router();

guestRouter.get('/', loadGuestHome)
guestRouter.post('/generate-password', generatePassword)

export default guestRouter;