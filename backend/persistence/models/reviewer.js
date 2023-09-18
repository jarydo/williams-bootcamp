import mongoose from "mongoose";

const Reviewer = mongoose.model("Reviewer", new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        reviews: [{
            // To note: ideally, we will associate restaurant id with an actual restaurant to populate values. 
            // As of now, this doesn't really do anything
            restaurantId: {
                type: String
            },
            restaurant: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
                validate: {
                    validator: Number.isInteger
                },
                required: true
            },
            description: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }]
    }
));

export default Reviewer;