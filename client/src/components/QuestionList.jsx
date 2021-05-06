import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatIcon from "@material-ui/icons/Chat";
import axios from "../helper/axioshelper";
import Avatar from "@material-ui/core/Avatar";
import "../StyleSheet/QuestionList.css";

import { Link } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {

    axios
      .get("https://pecquora-akshayrr1027.herokuapp.com/api/all-questions", { withCredentials:true })
      .then((response) => {
        console.log(response);
        setQuestions(response.data);
      });
    
  });
  
  const Like = (ID) => {
    const url = "https://pecquora-akshayrr1027.herokuapp.com/api/likes";

    const data = new FormData();
    data.append("id", ID);

    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div className="QuestionList">
      {questions && (
        <div className="Questions">
          {[questions].map((question) => {
            return (
              <div className="question" key={question._id}>
                <div className="question__profile">
                  <Avatar src={question.owner_image} alt="User Profile" />
                  <h4>{question.owner}</h4>
                </div>
                <div className="question__info">
                  <div className="question__question">
                    <h4>{question.question}</h4>
                  </div>
                  <div className="question__stats">
                    <div className="likes" style={{ cursor: "pointer" }}>
                      <ThumbUpIcon onClick={() => Like(question._id)} />
                      <h4>{question.upvotes}</h4>
                    </div>
                    <Link className="comments" style ={{textDecoration: "none", color: "white"}} to= {`/questions/${question._id}`} /*onClick={()=> QuestionID(question._id)}*/ 
                    > {/* to redirect user to /answer page */}
                    <div className="comments" style={{ cursor: "pointer", textDecoration: "none" }}>
                      <ChatIcon />
                    </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }).reverse()}
        </div>
      )}
    </div>
  );
};

export default QuestionList;