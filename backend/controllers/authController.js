import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Genrate JWT Token
const GenrateToken = async(id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7day'
    });
}

// @Desc  Register new user
// @Route POST /api/auth/register
// @access Public
export const register = async(req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

// @Desc  Login user
// @Route POST /api/auth/login
// @access Public
export const login = async(req, res, next) => {};


// @desc  Get user profile
// @route Get /api/auth/profile
// @access Private
export const getProfile = async(req, res, next) => {};


// @desc  Update user profile
// @route Put /api/auth/profile
// @access Private
export const updateProfile = async(req, res, next) => {};


// @desc  change password
// @route POST /api/auth/change-password
// @access Private
export const changePassword = async(req, res, next) => {};
