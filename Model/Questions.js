import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
    owner: { type: String, required:true },
    owner_image: { type: String, required:true },
    question: { type: String, required:true },
    upvotes: { type: Number, default:0 },
    comments: [
        {   
            owner: String,
            owner_image: String,
            text: String,
            upvotes: { type: Number, default:0 },
        },
    ]
});

const questionModel = mongoose.model("questionsModel", questionSchema);

export default questionModel;