import Joi from 'joi';
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    rating: { type: Number },
    releaseDate: { type: Date, required: true },
    directors: [{ type: String }],
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
    },
});

const Movie = mongoose.model('Movie', movieSchema);

export function validateMovie(movie) {
    const schema = {
        name: Joi.string().max(50).required(),
        releaseDate: Joi.date().iso().required(),
        rating: Joi.number().min(0).max(10).required(),
        directors: Joi.array(),
    };

    return Joi.validate(movie, schema);
}

export default Movie;
