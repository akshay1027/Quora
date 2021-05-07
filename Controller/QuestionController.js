const formidable = require('formidable');	
const questionModel = require('../Model/Questions');
const jwt = require('jsonwebtoken');
const userModel = require("../Model/Users");	

    //===================================================================ask quwstion==================================================

    const AskQuestion = (request, response) => {
    const form = new formidable.IncomingForm();

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
            .json({ msg: "Please enter your question!!" });
        }

        // const userSession = request.session.user || false;

        const token = request.cookies.jwtoken;
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        
        const rootUser= await userModel.findOne({_id:verifyToken._id,"tokens.token":token})

        if (rootUser) {
          const owner_image = rootUser.profileImage;
          const owner = rootUser.username;

          const newQuestion = new questionModel({
            owner: owner,
            owner_image: owner_image,
            question: question,
          });


          const savedQuestion = await newQuestion.save();

          return response.status(201).json({ msg: "Question Asked" });
        }
        else {
           return response.status(200).json({ msg: "Login or Signup to ask question" }); 
        }
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
  }
  
  //===========================================================get all questions====================================================

   const GetAllQuestions = async (request, response) => {
    try {
      const data = await questionModel.find();
      return response.status(200).json(data);
    } catch (error) {
      return response
        .status(501)
        .json({ msg: "Server currently down please try again later" });
    }
  }
  
  //===========================================get question by id==========================================

   const getQuestionById = async (request, response) => {
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


    const LikeQuestion = (request, response) => {
    const form = new formidable.IncomingForm();

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

    const SendAnswer = (request, response) => {
    const form = new formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Could not ask your question" });
        }

        const ID = request.params.id;

        const token = request.cookies.jwtoken;
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        
        const rootUser= await userModel.findOne({_id:verifyToken._id,"tokens.token":token})

        if (rootUser) {
          const owner_image = rootUser.profileImage;
          const owner = rootUser.username;
        
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

   const GetAllAnswer = async (request, response) => {
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


    const LikeAnswer = (request, response) => {    
        const form = new formidable.IncomingForm();

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
  
            return response.status(200).json({ msg: "Liked" });
        });
        } catch (error) {
          return response
            .status(500)
            .json({ msg: "Server currently down please try again later" });
        }
      }


module.exports = {
    AskQuestion,
    GetAllQuestions,
    getQuestionById,
    SendAnswer,
    GetAllAnswer,
    LikeQuestion,
    LikeAnswer
};