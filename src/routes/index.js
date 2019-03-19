import express from 'express';

const router = express.Router();

router.post('/auth/login', require('../api/login'));
router.use('/api/users', require('../api/users'));
router.use('/api/movies', require('../api/movies'));

module.exports = router;
