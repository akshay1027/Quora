import React from "react";
import AnswerBox from "./AnswerBox";
import QuestionById from "./QuestionById";
import Background from "./Background";
import AnswerList from "./AnswerLIst";

const QuestionScreen = (props) => {
     const questionID = props.match.params.id;
     const authStatus = props.authStatus;
     const profileImage = props.profileImage;
     const username = props.username;

    

     return (
     <div style={{background:"rgba(25, 28, 31)"}}>
     <Background style={{padding:"-2rem"}}/>
     <QuestionById style={{padding:"rem"}} questionID={questionID} profileImage={profileImage} authStatus={authStatus}/>
     <AnswerBox questionID={questionID} profileImage={profileImage} authStatus={authStatus} username={username}/>
     <AnswerList questionID={questionID} profileImage={profileImage} authStatus={authStatus} />
     <Background />
     </div>
     );
}

export default QuestionScreen;