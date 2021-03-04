import Formidable from "formidable";
import AnswerModel from "../../Model/Answers/Answer";
import Pusher from "pusher";
import mongoose from "mongoose";

const pusher = new Pusher({
    appId: "1163594",
    key: "5bb1120da3668b56421f",
    secret: "750cdc2fdb0c08176f53",
    cluster: "mt1",
    useTLS: true
}); 

const db = mongoose.connection;
const AnswerCollection = db.collection("answermodels");

db.once("open", () => {
  
  // watch for any changes in our mongodb
   
  const changeStream = AnswerCollection.watch();
  
  /*
  {
    _id: {
      _data: '82603B802B000000052B022C0100296E5A10049831099B9A6E4172BA34A6FA8474AFE546645F69640064603B802B46343428AC91DEF60004'
    },
    operationType: 'insert',
    clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 5, high_: 1614512171 },     
    fullDocument: {
      _id: 603b802b46343428ac91def6,
      upvotes: 0,
      comments: [],
      owner: 'akshayrr10',
  ora/profileimage/akshayrr10/nv6kjlmyuujrw5hmbgi4.jpg',                               ora/profileimage/akshayrr10/nv6kjlmyuujrw5hmbgi4.jpg',
      answer: 'what is MERN stack?',
      __v: 0
    },
    ns: { db: 'pecquora', coll: 'questionsmodels' },
    documentKey: { _id: 603b802b46343428ac91def6 }
  }
  */
  
  // display realtime
  
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("questions", "insertion", {
        data: change.fullDocument,
      });
    }
  });
});

class AnswerController {

    //===================================================================ask quwstion==================================================

  AskQuestion(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Could not ask your answer" });
        }

        const { answer } = fields;

        if (!answer) {
          return response
            .status(400)
            .json({ msg: "A answer has to be asked" });
        }

        const userSession = request.session.user || false;

        if (userSession) {
          const owner_image = userSession.profileImage;
          const owner = userSession.username;
          
          const newQuestion = new AnswerModel({
            owner: owner,
            owner_image: owner_image,
            answer: answer,
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
  
  //===========================================================get all questions====================================================

  async GetAllQuestions(request, response) {
    try {
      const data = await AnswerModel.find();
      return response.status(200).json(data);
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
  }
  

  //============================================like==========================================================


  Like(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Failed to like answer" });
        }

        const { id } = fields;

        const answer = await AnswerModel.findOne({ _id: id });

        answer.upvotes += 1;

        const updatedDoc = await AnswerModel.findOneAndUpdate(
          { _id: id },
          answer,
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
}

export default AnswerController;