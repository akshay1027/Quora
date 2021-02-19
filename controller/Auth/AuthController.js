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

class AuthController{

    signup(request,response) {

        const form = new formidable.IncomingForm();

        // use try catch becoz it returns error 
        //when the server is down but the try logic is correct
        // status(500) indicates internal server error
        try {

        } catch(error){
            return response
            .status(500)
            .json({ msg: "Server currently down, try later"});
        }
    }
}