import Formidable from "formidable";
import AnswerModel from "../Model/Answer";
import questionModel from "../Model/Questions";

/*const pusher = new Pusher({
    appId: "1163594",
    key: "5bb1120da3668b56421f",
    secret: "750cdc2fdb0c08176f53",
    cluster: "mt1",
    useTLS: true
}); 

/*const db = mongoose.connection;
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
  
  
  // display realtime
  
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("answers", "insertion", {
        data: change.fullDocument,
      });
    }
  });
}); 
*/

class AnswerController {

    //===================================================================ask quwstion==================================================

  AskAnswer(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields) => {
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
          
          const newAnswer = new AnswerModel({ 
            owner: owner,
            owner_image: owner_image,
            answer: answer,
          });

          const savedAnswer = await newAnswer.save();

          return response.status(201).json({ msg: "Answer Asked" });
        }
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
  }
  
  //===========================================================get all answers====================================================

  async GetAllAnswer(request, response) {
    try {
      const data = await AnswerModel.find();
      return response.status(200).json(data);
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
  }


  //===========================================================get question by id====================================================

  async getQuestionById (request, response) {
      try {
          const currentQuestionId = await answerModel.findById(request.params.id);
          return response.status(200).json(currentQuestionId);


      } catch (error) {
        return response
          .status(500)
          .json({ msg: "Server currently down please try again later" });
      }
  }
 
  /*async getQuestionById (request, response) {
    try {
        const product = await questionModel.findById(request.params.id);
        const question = product.question;
        return response.status(200).json(question);
    } catch (error) {
        return response
          .status(500)
          .json({ msg: "Server currently down please try again later" });
      }
  };
  

  async getQuestionById (request, response) {
    try {
        const product = await questionModel.findById(request.params.id).populate('answersModel').exec((err, posts) => {
            console.log("Populated User " + posts);
          })
        const question = product.question;
        return response.status(200).json(question);   
    } catch (error) {
        return response
          .status(500)
          .json({ msg: "Server currently down please try again later" });
      }
  };
  */
  


  //===========================================================Like========================================================================



  Like(request, response){
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Failed to like question" });
        }

        const { id } = fields;

        const question = await AnswerModel.findOne({ _id: id });

        question.upvotes += 1;

        const updatedDoc = await AnswerModel.findOneAndUpdate(
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
  

  //============================================ for answer page, to get single question using id==========================================================


  UniqueQuestionID(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Failed to like answer" });
        }

        const { id } = fields;

        const answer = await questionModel.findOne({ _id: id });

        return response.status(200).json({ msg: "question found" });
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
  }

}

export default AnswerController;










  

  //=============================================== Like ===================================================================

  /*Like(request, response){
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
  } */