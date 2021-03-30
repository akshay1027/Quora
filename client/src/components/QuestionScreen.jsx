import React from "react";
import QuestionById from "./QuestionById";

const QuestionScreen = (props) => {
     console.log(props);
     const questionID = props.match.params.id;
     const authStatus = props.authStatus;
     const profileImage = props.profileImage;
    

     return <QuestionById questionID={questionID} profileImage={profileImage} authStatus={authStatus}/>
}

export default QuestionScreen;