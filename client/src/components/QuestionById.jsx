
//========= to get data (get request) from backend and display over here ==========

import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import "../StyleSheet/QuestionList.css";

const QuestionById = (props) => {
  const [question, setQuestion] = useState('');
  
  const questionID = props.questionID; // question id from url
  const profileImage = props.profileImage;
    /*
    useEffect(() => {
      const pusher = new Pusher('5bb1120da3668b56421f', {
          cluster: 'mt1'
      });
  
      const channel = pusher.subscribe('question');
      channel.bind('insertion', (data)=> {
        alert(JSON.stringify(data));
      });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [question]);
    */

  useEffect(() => {
    const url = `http://localhost:5000/questions/${questionID}`;

    axios
    .get(url, { withCredentials:true })
    .then((response) => {
      setQuestion(response.data);
    })
    .catch((error) => {
      console.error(error);
    }); 
  },[question]);
  
  
  const Like = (ID) => {
    const url = "http://localhost:5000/api/all-question/likes";

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

  /* flow 
     1. get the id of element by "_id".
     2. when clicked on comments send the id as argument.
     3. post the id over to backend. 
     4. check if id is present in question db or send the id back
     5. make get request and display the id!
    */

  return (
    
    <div className="QuestionList">
      {question && (
        <div className="Questions">
        <div className="question" key={question._id}>
        <div className="question__profile">
          <Avatar src={profileImage} alt="User Profile" />
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
          </div>
        </div>
      </div>
      </div>
      )}
    </div> 
    

    /* ================================================== 
    <div className="QuestionList">
      {question && (
        <div className="Questions">
          {question.map((question) => {
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div> */
  );
};

export default QuestionById;