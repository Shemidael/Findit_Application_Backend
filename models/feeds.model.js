import mongoose from "mongoose";

const constrains = {

    image: { type: String, required: true },
    title: { type: String, required: true },
    username: { type: String, required: true },
    useremail: { type: String, required: true },
    description: { type: String, required: true },
};

const Feed = mongoose.model('feeds', new mongoose.Schema(constrains, { timestamps: true }));

export default Feed;