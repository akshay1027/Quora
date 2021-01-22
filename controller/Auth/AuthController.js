import dotenv from 'dotenv';
import formidable from 'formidable';
import Cloudinary from 'cloudinary';
import userModel from "../../Model/User/Users";
import userSessions from "../../Model/UserSession/UserSessions";
import Bcrypt from "bcrypt";

dotenv.config();

const cloudinary = Cloudinary.v2;

cloudinary.config ({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});