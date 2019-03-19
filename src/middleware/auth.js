import jwt from 'jsonwebtoken';
import appConfig from '../config';

export default function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, appConfig.authorization.secretKey);
        if (decoded.exp <= Date.now()) return res.status(400).json({ error: 'Token Expired' });
        req.user = decoded;
        return next();
    } catch (ex) {
        return res.status(400).json({ success: false, message: 'Invalid token.' });
    }
}
