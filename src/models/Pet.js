import mongoose from 'mongoose';
import validator from 'validator';

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 15,
    },
    type: {
        type: String,
        enum: ['Dog', 'Cat'],
        default: 'Dog',
        required: true,
    },
    adoptionStatus: {
        type: String,
        enum: ['Available', 'Fostered', 'Adopted'],
        default: 'Available',
        required: true,
    },
    picture_url: {
        type: String,
        required: true,
        validate: {
            validator: validator.isURL,
            message: 'Please provide a valid URL',
        }
    },
    picture_public_id: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        maxlength: 100,
        required: true,
    },
    hypoallergenic: {
        type: Boolean,
        enum: [false, true],
        default: false,
        required: true,
    },
    dietaryRestrictions: {

        type: [String],
        maxlength: 100,
        required: true,
    },
    breedOfAnimal: {
        type: String,
        maxlength: 15,
        required: true,
    }
})

export default mongoose.model('Pet', PetSchema);