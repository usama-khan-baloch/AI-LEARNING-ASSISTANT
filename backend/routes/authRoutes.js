import express from "express";
import { body } from "express-validator";
import {register, login, getProfile, updateProfile, changePassword} from '../controllers/authController.js';
import protect from '../middlewares/auth.js';


const router = express.Router();

// Validation middleware
const registerValidation = [
    body('username').trim().isLength({min: 3}).withMessage('username must be at least 3 charaters'),
    
    body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
    body('password').isLength({min: 6}).withMessage('password must be at least 6 characters'),
];

const LoginValidation = [
     body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
     body('password').notEmpty().withMessage('password is required')
];

// Public Routes
router.post('/register', registerValidation, register);
router.post('/login', LoginValidation, login);

// Protected Routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/change-password', protect, changePassword);


export default router;
