import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    key: Number,
    name: String,
    ratings: Number,
    image: String,
    location: String,
    distance: Number
})

const Store = mongoose.model('store', storeSchema );

export default Store;

