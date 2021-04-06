import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatIcon from "@material-ui/icons/Chat";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import "../StyleSheet/QuestionList.css";

import { Link } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);


  /*
    useEffect(() => {
      const pusher = new Pusher('5bb1120da3668b56421f', {
          cluster: 'mt1'
      });
  
      const channel = pusher.subscribe('questions');
      channel.bind('insertion', (data)=> {
        alert(JSON.stringify(data));
      });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [questions]);
  */

  useEffect(() => {
    const server1 = process.env.NODE_ENV === "production"
    ? "https://pecquora-backend.herokuapp.com/api/all-questions" : "http://localhost:5000/api/all-questions";

    const url = server1;

    
    /*const init = async () => {

        // get http request using axios
  
        let res = await axios.get(url);
        res = await res.data;
        setQuestions(res);
      };
      init();
     */
    
    axios
      .get(url, { withCredentials:true })
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error(error);
      }); 
    
  });
  
  const Like = (ID) => {
    const url = "http://localhost:5000/api/likes";

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
  
  //const QuestionID = (ID) => {
    //
   
  //}

  return (
    <div className="QuestionList">
      {questions && (
        <div className="Questions">
          {questions.map((question) => {
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
                    <Link to= {`/questions/${question._id}`} /*onClick={()=> QuestionID(question._id)}*/ 
                    > {/* to redirect user to /answer page */}
                    <div className="comments" style={{ cursor: "pointer" }}>
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