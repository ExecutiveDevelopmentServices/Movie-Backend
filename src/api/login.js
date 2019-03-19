import bcrypt from 'bcrypt';
import express from 'express';
import User from '../model/user';


const router = express.Router();

router
    .post('/auth/login', async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ name: username }).populate('tenantId');
            if (!user) return res.status(422).json({ success: false, message: 'Invalid email or password' });

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.json({ success: false, message: 'Invalid email or password.' });

            const token = user.generateAuthToken();

            return res.json({ success: true, message: 'User data fetched successfully', data: { user, token } });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.toString() });
        }
    });


module.exports = router;
