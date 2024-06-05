import { SessionData } from 'express-session';
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}