import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectDb } from './utils/MongoDB';
import guestRouter from './routes/guest.route';
import userRouter from './routes/user.route';
import signupRouter from './routes/signup.route';
import loginRouter from './routes/login.route';
import verifyToken from './middlewares/auth.middlewares';
import morgan from 'morgan';

connectDb();
const app = express();

app.use(morgan("dev"));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || "Secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 86400000,
    },
}));

app.use('/api/guest', guestRouter)
app.use('/api/create-account', signupRouter)
app.use('/api/login', loginRouter)
app.use('/api/user', verifyToken, userRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ status: "Internal Server Error", message: err.message });
});

const Port = process.env.PORT;
app.listen(Port, () => {
    console.log(`Server Launched on Port ${Port}`);
});
