import React from "react";
import AnswerBox from "./AnswerBox";
import QuestionById from "./QuestionById";

const QuestionScreen = (props) => {
     console.log(props);
     const questionID = props.match.params.id;
     const authStatus = props.authStatus;
     const profileImage = props.profileImage;
    

     return (
     <div>
     <QuestionById questionID={questionID} profileImage={profileImage} authStatus={authStatus}/>
     <AnswerBox profileImage={profileImage} authStatus={authStatus}/>
     </div>
     );
}

export default QuestionScreen;