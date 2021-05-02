import mongoose from "mongoose";

const UserSessionsSchema = mongoose.Schema({
    expires: {type:Date, required: true},
    session: {type:Object, required:true},
});

export const userSessions = mongoose.model("usersessions",UserSessionsSchema);        