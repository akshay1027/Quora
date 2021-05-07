const mongoose = require('mongoose');

const UserSessionsSchema = mongoose.Schema({
    expires: {type:Date, required: true},
    session: {type:Object, required:true},
});

const userSessions = mongoose.model('usersessions', UserSessionsSchema);

module.exports = userSessions;

//export const userSessions = mongoose.model("usersessions",UserSessionsSchema);        