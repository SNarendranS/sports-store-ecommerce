import jwt from 'jsonwebtoken';

export const tokenDecode = (authorizeToken) => {
  try {
    if (!authorizeToken) {
      throw new Error('Authorization token missing');
    }

    // Expecting format: "Bearer <token>"
    const token = authorizeToken.split(' ')[1];
    if (!token) {
      throw new Error('Invalid token format');
    }

    const decoded = jwt.verify(token, process.env.JSON_SECRETKEY);
    if (!decoded) {
      throw new Error('Token verification failed');
    }

    const { email, name, role, userid } = decoded;
    return { email, name, role, userid };

  } catch (error) {
    console.error('Token decode error:', error.message);
    return null;
  }
};
