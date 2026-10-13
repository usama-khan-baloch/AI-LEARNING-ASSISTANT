

import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check whether the Bearer token exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized, no token provided',
      statusCode: 401
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find the user and exclude the password
    const user = await User.findById(decoded.id)
      .select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
        statusCode: 401
      });
    }

    // Attach the authenticated user to the request
    req.user = user;

    // Continue to the next middleware or controller
    return next();

  } catch (error) {
    console.error('Auth middleware error:', error.message);

    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError' ||
      error.name === 'NotBeforeError'
    ) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token',
        statusCode: 401
      });
    }

    return next(error);
  }
};

export default protect;