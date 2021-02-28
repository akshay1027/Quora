import Formidable from "formidable";
import questionModel from "../../Model/Questions/Questions";
import Pusher from "pusher";
import mongoose from "mongoose";

const pusher = new Pusher({
  appId: "1118677",
  key: "53fdc8e9fe904bde24f2",
  secret: "e2e9734b997cb6c25afc",
  cluster: "mt1",
  useTLS: true,
});

const db = mongoose.connection;
const questionsCollection = db.collection("questionsmodels");

db.once("open", () => {
  const changeStream = questionsCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("questions", "insertion", {
        data: change.fullDocument,
      });
    }
  });
});

class QuestionController {
  AskQuestion(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Could not ask your question" });
        }

        const { question } = fields;

        if (!question) {
          return response
            .status(400)
            .json({ msg: "A question has be to be asked" });
        }

        const userSession = request.session.user || false;

        if (userSession) {
          const owner_image = userSession.profileImage;
          const owner = userSession.username;

          const newQuestion = new questionModel({
            owner: owner,
            owner_image: owner_image,
            question: question,
          });

          const savedQuestion = await newQuestion.save();

          return response.status(201).json({ msg: "Question Asked" });
        }
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
  }

  async GetAllQuestions(request, response) {
    try {
      const data = await questionModel.find();
      return response.status(200).json(data);
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
  }

  Like(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Failed to like question" });
        }

        const { id } = fields;

        const question = await questionModel.findOne({ _id: id });

        question.upvotes += 1;

        const updatedDoc = await questionModel.findOneAndUpdate(
          { _id: id },
          question,
          { new: true }
        );

        return response.status(200).json({ msg: "Liked" });
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
  }
  Dislike(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Failed to like question" });
        }

        const { id } = fields;

        const question = await questionModel.findOne({ _id: id });

        question.downvotes += 1;

        const updatedDoc = await questionModel.findOneAndUpdate(
          { _id: id },
          question,
          { new: true }
        );

        return response.status(200).json({ msg: "DisLiked" });
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
  }
}

export default QuestionController;