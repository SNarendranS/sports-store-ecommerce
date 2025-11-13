import { tokenDecode } from '../utils/tokenDecode.js';

const authorizeMiddleware = (req, res, next) => {
  const authorizeToken = req.headers.authorization;

  // Check if header exists and starts with 'Bearer'
  if (!authorizeToken || !authorizeToken.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const decodedUser = tokenDecode(authorizeToken);

  if (!decodedUser) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  // Attach decoded user info to the request
  req.user = decodedUser;

  // Continue to the next middleware or route
  next();
};

export default authorizeMiddleware;
