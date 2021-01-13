import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
});

export const userModel = mongoose.model("userModal", userSchema);