import Formidable from "formidable";
import questionModel from "../Model/Questions";

class QuestionController {

    //===================================================================ask quwstion==================================================

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
  
  //===========================================================get all questions====================================================

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
  
  //===========================================get question by id==========================================

  async getQuestionById (request, response) {
    try {
        const currentQuestionId = await questionModel.findById(request.params.id);
        return response.status(200).json(currentQuestionId);


    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
}

  //============================================like for question ==========================================================


  LikeQuestion(request, response) {
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

  //============================ post answer to DB ======================================

  SendAnswer(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Could not ask your question" });
        }

        const ID = request.params.id;

        const userSession = request.session.user || false;

        if (userSession) {
          const owner_image = userSession.profileImage;
          const owner = userSession.username;
        
        
        const { comments } = fields;

        if (!comments) {
          return response
            .status(400)
            .json({ msg: "A answer has be to be send" });
        }

        const question = await questionModel.findOne({ _id: ID });
        
        const comment = {
            owner:owner,
            owner_image:owner_image,
            text:comments
        }

        question.comments.push(comment);
        
        const updatedDoc = await questionModel.findOneAndUpdate(
            { _id: ID },
            question,
            { new: true }
          ); 

          return response.status(201).json({ msg: "Answer is stored in db" });

        }
        
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
  }

  async GetAllAnswer(request, response) {
    try {
        const ID = request.params.id;

        const answer = await questionModel.findOne({ _id: ID });
        const comment = answer.comments;

      return response.status(200).json(comment);
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
  }

    //==========================================like for answer==========================================================


    LikeAnswer(request, response) {    
        const form = new Formidable.IncomingForm();

        try {
            form.parse(request, async (error, fields, files) => {
            if (error) {
            return response
                .status(500)
                .json({ msg: "Network Error: Failed to like question" });
            }

            const { id } = fields;

            const id_q = request.params.id;


            const answer = await questionModel.findOneAndUpdate(
                {
                    '_id' : id_q,
                    "comments._id": id
                },
                {$inc: {
                    "comments.$.upvotes": 1 
                 }},
                 function(err){
                    console.log(err)
                  })
            
            
            /* const answer = await questionModel.updateOne(
                { _id: id_q, "comments._id": id },
                {
                    $set: {
                        "comments.$.upvotes": 0,
                     }
                }
            ) */

            console.log(answer);
    
            const updatedDoc = await questionModel.findOneAndUpdate(
              { "comments._id": id },
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

export default QuestionController;
