const jwt = require('jsonwebtoken');

const authorizeMiddleware = (req, res, next) => {
    const authorizeToken = req.headers.authorization;
    if (!authorizeToken || !authorizeToken.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const token = authorizeToken.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JSON_SECRETKEY);
        const { email, name, role, userid } = decoded;
        req.user = { email, name, role, userid };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authorizeMiddleware;
