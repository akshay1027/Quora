import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expressSession from "express-session";
import MongoStore from "connect-mongodb-session";


dotenv.config();

const app = express();

app.listen(5000, () =>{
    console.log("started server");
});