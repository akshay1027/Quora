import mongoose from 'mongoose';

const answerSchema = mongoose.Schema({
    owner: { type: String, required: true },
    owner_image: { type: String, required: true },
    answer: { type: String, required: true },
    upvotes: { type: Number, default: 0 }
});

const answerModel = mongoose.model('answersModel', answerSchema);

export default answerModel;
