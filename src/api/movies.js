import mongoose from 'mongoose';
import express from 'express';
import auth from '../middleware/auth';
import Movie, { validateMovie } from '../model/movie';

const router = express.Router();

router
    .get('/', auth, async (req, res) => {
        try {
            const query = { tenantId: req.user.tenantId };

            const movies = await Movie.find(query);
            return res.json({ success: true, message: 'Movies fetched successfully', data: movies });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.toString() });
        }
    })
    .get('/:id', auth, async (req, res) => {
        try {
            const query = { _id: req.params.id };

            const movie = await Movie.findOne(query);
            return res.json({ success: true, message: 'Movie fetched successfully', data: [movie] });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.toString() });
        }
    })
    .post('/', auth, async (req, res) => {
        try {
            const { error } = validateMovie(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const data = { ...req.body };
            data.tenantId = req.user.tenantId;
            const movie = await Movie.create(data);

            return res.json({ success: true, message: 'Movie created', data: movie });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.toString() });
        }
    })
    .put('/', auth, async (req, res) => {
        try {
            const { id } = req.body;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(422).json({
                    success: false,
                    message: 'Invalid id',
                });
            }

            await Movie.update({ _id: id, tenantId: req.user.tenantId }, req.body);
            return res.json({ success: true, message: 'Document updated' });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.toString() });
        }
    })
    .delete('/:id', auth, async (req, res) => {
        try {
            const query = { _id: req.params.id, tenantId: req.user.tenantId };

            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(422).json({
                    success: false,
                    message: 'Invalid id',
                });
            }

            const { n } = await Movie.deleteOne(query); // n is the number of matched documents
            if (n) return res.json({ success: true, message: 'Document deleted' });
            return res.status(404).json({ success: false, message: 'No document found' });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.toString() });
        }
    });


module.exports = router;
