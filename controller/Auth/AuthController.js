import dotenv from 'dotenv';
import formidable from 'formidable';
import Cloudinary from 'cloudinary';
import {userModel} from "../../Model/User/Users";
import {userSessions} from "../../Model/UserSession/UserSessions";
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
    
    // signup logic

    signup(request,response) {
        
        const form = new formidable.IncomingForm();

        try {

            form.parse(request, async (error, fields, files)=>{
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
                //while checking with db we use async await
                //else not needed

                const isUserExisting = await userModel.findOne({ username: username});
                
                // if user exists, return error

                if(isUserExisting){
                    return response
                        .status(404)
                        .json({ msg:"User with this username already exists"});
                }
                
                //upload image to cloudinary to get url of the image

                cloudinary.uploader.upload(image.path, {folder:`/pecquora/profileimage/${username}`}, async (error,results)=>{
                    if(error){
                        console.error(error);
                        return response
                            .status(500)
                            .json({ msg:"Image upload error: check your image file type"});
                    }
                    
                    // get url of the image

                    const image_url = results.secure_url;

                    // Hash or encrypt password(best parctise) using Bcrypt
                    // salt is used to encrypt password

                    const salt = await Bcrypt.genSalt(15);
                    const hashedPassword = await Bcrypt.hash(password,salt);

                    // create new instance and write/save to db

                    const newUser = new userModel({
                        username: username,
                        password: hashedPassword,
                        profileImage: image_url
                    })
                    
                    // everytime you interact with mongoDB, use async await

                    const savedUser = await newUser.save();
                    
                    // 201-created, 200-okay

                    return response
                        .status(201)
                        .json({ msg:"New account has been created"})

                });
               
            });

        } 
        
        catch(error){
            return response
            .status(500)
            .json({ msg: "Server currently down, try later"});
        }
        // use try catch becoz it returns error even 
        // when the server is down but the try logic is correct.
        // status(500) indicates internal server error

    }
}