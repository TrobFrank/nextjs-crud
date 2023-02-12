import { Schema, model, models } from "mongoose";

const locationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: String,
    image: String,
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    }
})

const Location = models.Location || model('Location', locationSchema);

export default Location;