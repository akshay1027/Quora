const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImage: {type: String}
});

const userModel = mongoose.model('userModal', userSchema);

module.exports = userModel;

//export const userModel = mongoose.model("userModal", userSchema);