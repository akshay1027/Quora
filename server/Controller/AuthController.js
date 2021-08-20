/* eslint-disable brace-style */
/* eslint-disable camelcase */
const dotenv = require('dotenv');
const formidable = require('formidable');
const Cloudinary = require('cloudinary');
const UserModel = require('../Model/Users');
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();

// ------------------cloudinary setup-------------------
const cloudinary = Cloudinary.v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

//= ===========================================signup logic=========================================

const SignUp = (request, response) => {
    const form = new formidable.IncomingForm();

    try {
        form.parse(request, async (error, fields, files) => {
            if (error) {
                console.error(error);
                return response
                    .status(500)
                    .json({ msg: 'Network Error: Failed to register, try again later.' });
            }

            // destructure incoming data
            console.log(fields);

            const { username, password, gmail, department, yearPassout, gistAbout, linkedin } = fields;
            const { image } = files;

            // required + validation

            if (!username || !password || !image || !gmail || !department || !gistAbout) {
                return response
                    .status(400)
                    .json({ msg: 'All fields are required' });
            }

            if (password.length < 6) {
                return response
                    .status(400)
                    .json({ msg: 'Password has to be atleast 6 characters' });
            }

            // check for duplicate username
            // while checking with db we use async await
            // else not needed

            const isUserExisting = await UserModel.findOne({ username: username });

            // if user exists, return error

            if (isUserExisting) {
                return response
                    .status(404)
                    .json({ msg: 'User with this username already exists' });
            }

            // upload image to cloudinary to get url of the image

            cloudinary.uploader.upload(image.path, { folder: `/pecquora/profileimage/${username}`, width: 100, crop: 'scale' }, async (error, results) => {
                if (error) {
                    console.error(error);
                    return response
                        .status(500)
                        .json({ msg: 'Image upload error: check your image file type' });
                }

                // get url of the image if there is no error

                const image_url = results.secure_url;

                // Hash or encrypt password(best parctise) using Bcrypt
                // salt is used to encrypt password

                const salt = await Bcrypt.genSalt(15);
                const hashedPassword = await Bcrypt.hash(password, salt);

                // create new instance and write/save to db

                const newUser = new UserModel({
                    username: username,
                    password: hashedPassword,
                    profileImage: image_url,
                    gmail: gmail,
                    department: department,
                    yearPassout: yearPassout,
                    gistAbout: gistAbout,
                    linkedin: linkedin
                });

                // everytime you interact with mongoDB, use async await

                const savedUser = await newUser.save();

                // 201-created, 200-okay

                return response
                    .status(201)
                    .json({ msg: 'New account has been created' });
            }); // close cloudniary
        }); // close formidable
    } // close try

    catch (error) {
        return response
            .status(500)
            .json({ msg: 'Server currently down, try later' });
    }
    // use try catch becoz it returns error even
    // when the server is down but the try logic is correct.
    // status(500) indicates internal server error
};

// =========================================Login logic=========================================

/*
       FLOW:
       1) Parse using formidable
       2) Destructure request
       3) username, password validation
       4) check password with hashed password in db
       5) check if session is present
       6) catch method
    */

const Login = (request, response) => {
    // getting data using formidable

    const form = new formidable.IncomingForm();

    try {
        form.parse(request, async (error, fields, files) => {
            if (error) {
                console.error(error);
                return response
                    .status(500)
                    .json({ msg: 'Network Error: Failed to register, try again later.' });
            }

            // destructure incoming data

            const { username, password } = fields;
            const { image } = files;

            // required + validation

            if (!username || !password) {
                return response
                    .status(400)
                    .json({ msg: 'All fields are required' });
            }

            const isUserExisting = await UserModel.findOne({ username: username });

            // if user doesnot exists, return error

            if (!isUserExisting) {
                return response
                    .status(404)
                    .json({ msg: 'Account with this username doesnot exists' });
            }

            // check entered password with hashed password

            const hashedPassword = isUserExisting.password;
            const isPasswordValid = await Bcrypt.compare(password, hashedPassword);

            const token = await isUserExisting.generateAuthToken();// calling function from userschema

            response.cookie('jwtoken', token, { // takes name:string and value:string(this value comes from userschema )
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true // for secure connection
            });

            if (!isPasswordValid) {
                return response
                    .status(400)
                    .json({ msg: 'Invalid credentials' });
            } else {
                response.json({ msg: 'user signin sucessfully' });
            }
            // const isrootUserExisting = await rootUsers.findOne({username: username})

            // if(isrootUserExisting){
            //     return response
            //         .status(200)
            //         .json({msg:"Already signed in"})
            // }

            //  when user doesnot have session

            // request.session.user = {
            //     username: isUserExisting.username,
            //     id: isUserExisting._id,
            //     profileImage: isUserExisting.profileImage,
            //   };

            // response.status(200).send(request.session)
        }); // close formidable
    } // close try
    catch (error) {
        return response
            .status(500)
            .json({ msg: 'Server currently down, try later' });
    }
};

//= ==============================================is logged in========================================================

const isLoggedIn = async (request, response) => {
    const token = request.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await UserModel.findOne({ _id: verifyToken._id, 'tokens.token': token });// we acess token in mongo DB from tokens.token
    try {
        if (rootUser) {
            return response
                .status(200)
                .json({
                    authStatus: true,
                    profileImage: rootUser.profileImage,
                    username: rootUser.username
                });
        }

        return response.status(200).json({ authStatus: false });
    } catch (error) {
        //   return response.status(500, {
        //     msg: "Server Error: Server currently down try again later",
        //   });
        console.error(error);
    }
};

module.exports = {
    SignUp,
    Login,
    isLoggedIn
};
