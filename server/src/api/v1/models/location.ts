import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: String,
    },
    avarageRating : {
        type: String
    }
});

const Location = mongoose.model('Location', locationSchema, 'locations')

export default Location;