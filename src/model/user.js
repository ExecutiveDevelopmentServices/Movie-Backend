import jwt from 'jsonwebtoken';
import Joi from 'joi';
import mongoose from 'mongoose';
import appConfig from '../config';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
    },
});

userSchema.methods.generateAuthToken = function () {
    const expiresIn = expires(appConfig.authorization.secretKeyExpiresIn);
    return jwt.sign(
        {
            id: this.id, tenantId: this.tenantId,
        },
        appConfig.authorization.secretKey, { expiresIn },
    );
};

function expires(numDays) {
    const dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

const User = mongoose.model('User', userSchema);

export function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required(),
        tenantName: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(user, schema);
}

export default User;
