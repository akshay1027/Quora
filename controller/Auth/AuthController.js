import dotenv from 'dotenv';
import formidable from 'formidable';
import Cloudinary from 'cloudinary';
import userModel from "../../Model/User/Users";
import userSessions from "../../Model/UserSession/UserSessions";
import Bcrypt from "bcrypt";

dotenv.config();

//----------------cloudinary setup-------------------
const cloudinary = Cloudinary.v2;

cloudinary.config ({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

//----------------class method to follow OOPs-------------------

class AuthController{
   
    signup(request,response) {
        
        const form = new formidable.IncomingForm();

        try {

            form.parse(request, (error, fields, files)=>{
                if(error){
                    console.error(error);
                    return response
                        .status(500)
                        .json({ msg: "Network Error: Failed to register, try again later."});
                }
                
                //destructure incoming data

                const { username, password } = fields;
                const { image } = files;

                //required + validation 

                if(!username || !password) {
                    return response
                        .status(400)
                        .json({ msg:"All fields are required"});
                }

                if(password.length<6) {
                    return response
                        .status(400)
                        .json({ msg:"Password has to be atleast 6 characters"});
                }

                //check for duplicate username



            });

        } catch(error){
            return response
            .status(500)
            .json({ msg: "Server currently down, try later"});
        }
        // use try catch becoz it returns error 
        //when the server is down but the try logic is correct
        // status(500) indicates internal server error

    }
}