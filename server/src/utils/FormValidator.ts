import { check } from "express-validator";

export const validateSignup = [
    check("fullName")
        .notEmpty().withMessage('Full name is required')
        .isString().withMessage('Full name must be a characters'),

    check("email")
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid Email')
        .normalizeEmail(),

    check("password")
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 12 }).withMessage('Password must be at least 6 characters'),
];

export const validateLogin = [
    check("email")
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid Email')
        .normalizeEmail(),

    check("password")
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 12 }).withMessage('Password must be at least 12 characters'),
];