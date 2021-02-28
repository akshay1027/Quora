import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ChatIcon from "@material-ui/icons/Chat";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import "../StyleSheet/QuestionLIst.css";
import Pusher from "pusher-js";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const pusher = new Pusher("53fdc8e9fe904bde24f2", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("questions");
    channel.bind("insertion", (data) => {
      setQuestions([data.data, ...questions]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [questions]);

  useEffect(() => {
    const url = "http://localhost:5000/api/all-questions";

    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const Dislike = (ID) => {
    const url = "http://localhost:5000/api/dislike";

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
                    <div className="dislikes" style={{ cursor: "pointer" }}>
                      <ThumbDownIcon onClick={() => Dislike(question._id)} />
                      <h4>{question.downvotes}</h4>
                    </div>
                    <div className="comments" style={{ cursor: "pointer" }}>
                      <ChatIcon />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestionList;