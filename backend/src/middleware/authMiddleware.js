import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check token exists
    if (!authHeader) {
      return res.status(401).json({
        message: 'No token provided',
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store user data in request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token',
    });
  }
};

export default protect;