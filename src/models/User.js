import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false,
    },
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: validator.isNumeric,
            message: 'Please provide only numbers',
        },
        required: [true, 'Please provide phone number'],
        minlength: 10,
        maxlength: 10
    },
    bio: {
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: false
    },
    savedPets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet',
            required: false,
            unique: false
        }
    ],
    ownedPets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet',
            required: false,
            unique: false
        }
    ]
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

export default mongoose.model('User', UserSchema);