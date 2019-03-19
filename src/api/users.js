import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import express from 'express';
import auth from '../middleware/auth';
import User, { validateUser } from '../model/user';
import Tenant from '../model/tenant';

const router = express.Router();

router
    .get('/', auth, async (req, res) => {
        try {
            const query = { tenantId: req.user.tenantId };

            const users = await User.find(query).populate('tenantId');
            return res.json({ success: true, message: 'Users fetched successfully', data: users });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.toString() });
        }
    })
    .get('/:id', auth, async (req, res) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(422).json({
                    success: false,
                    message: 'Invalid id',
                });
            }

            const query = { _id: req.params.id };

            const user = await User.findOne(query).populate('tenantId');
            return res.json({ success: true, message: 'Users fetched successfully', data: user });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.toString() });
        }
    })
    .post('/', async (req, res) => {
        try {
            const { error } = validateUser(req.body);
            if (error) return res.status(400).json(error.details[0].message);

            const tenant = await Tenant.create({ name: req.body.tenantName });
            const data = { ...req.body };
            data.tenantId = tenant.id;
            data.password = await passwordHash(data.password);

            const user = await User.create(data);

            return res.json({ success: true, message: 'User created', data: user });
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(422).json({
                    success: false,
                    message: 'Username already exist',
                });
            }// for handling duplicate name on client side
            return res.status(500).json({ success: false, message: err.toString() });
        }
    })
    .put('/', async (req, res) => {
        try {
            const { id, password } = req.body;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(422).json({
                    success: false,
                    message: 'Invalid id',
                });
            }

            if (password) req.body.password = await passwordHash(password);

            const { nModified } = await User.update({ _id: id }, req.body);
            if (nModified) return res.json({ success: true, message: 'Document updated' });
            return res.status(400).json({ success: true, message: 'Invalid request, document not updated' });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.toString() });
        }
    })
    .delete('/:id', auth, async (req, res) => {
        try {
            const query = { _id: req.params.id };

            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(422).json({
                    success: false,
                    message: 'Invalid id',
                });
            }

            const { n } = await User.deleteOne(query); // n is the number of matched documents
            if (n) return res.json({ success: true, message: 'Document deleted' });
            return res.status(404).json({ success: false, message: 'No document found' });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.toString() });
        }
    });


const passwordHash = async password => bcrypt.hash(password, await bcrypt.genSalt(10));


module.exports = router;
