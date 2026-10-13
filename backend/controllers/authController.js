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
        const {username, email, password} = req.body;

        //check if user already exist
      const userExist = await User.findOne({$or: [ { email } ] });
        if(userExist) {
            return res.status(400).json({
                success: false,
                error: userExist.email ? 'Email already registered' : 'UserName already aken',
                statusCode: 400
            })
        }

        // Create User
        const user = await User.create({
            username,
            email,
            password
        });

        // Genrate token
        const token = await GenrateToken(user._id);
        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profileImage: user.profileImage,
                    createdAt: user.createdAt
                },
                token
            },
            message: 'User registered successfully'
        })
    } catch (error) {
        
    }
}

// @Desc  Login user
// @Route POST /api/auth/login
// @access Public
export const login = async(req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};


// @desc  Get user profile
// @route Get /api/auth/profile
// @access Private
export const getProfile = async(req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};


// @desc  Update user profile
// @route Put /api/auth/profile
// @access Private
export const updateProfile = async(req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};


// @desc  change password
// @route POST /api/auth/change-password
// @access Private
export const changePassword = async(req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};
