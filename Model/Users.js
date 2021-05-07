const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImage: {type: String, required: true},
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

userSchema.methods.generateAuthToken = async function(){  //we use a method of userschema
    try {
        console.log("hello from inside")
        let tokenNew =jwt.sign({_id:this._id},process.env.SECRET_KEY);//it takes payload(must be unique ex->_id) and secret/private key [options,callback]
         this.tokens= this.tokens.concat({token:tokenNew}) //it concats(joins string) one token to the other token in the Tokens section of mongoose schema
         await this.save();
         return tokenNew;  //returning token so that we can use it in auth.js
    } catch (error) {                 //we are getting _id from mongodb || this refers to a particular user details
        console.log(error);
        
    }
}

const userModel = mongoose.model('userModal', userSchema);

module.exports = userModel;

//export const userModel = mongoose.model("userModal", userSchema);