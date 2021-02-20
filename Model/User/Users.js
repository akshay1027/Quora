import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImage: {type: String}
});

export const userModel = mongoose.model("userModal", userSchema);