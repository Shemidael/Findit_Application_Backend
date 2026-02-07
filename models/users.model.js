import mongoose from "mongoose";

const constrains = {

    telephone:       { type: String },
    profile_picture: { type: String },

    email:     { type: String, required: true },
    password:  { type: String, required: true, min: 6 },

    firstname: { type: String, required: true, max: 255 },
    lastname:  { type: String, required: true, max: 255 },

    feeds: [{ type: mongoose.Types.ObjectId, ref: "feeds" }]

};

export const requiredFeilds = ['firstname', 'lastname', 'email', 'password', 'confirm_password'];

const User = mongoose.model('users', new mongoose.Schema(constrains, { timestamps: true }));

export default User;