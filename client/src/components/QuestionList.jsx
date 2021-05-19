import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatIcon from "@material-ui/icons/Chat";
import axios from "../helper/axioshelper";
import Avatar from "@material-ui/core/Avatar";
import "../StyleSheet/QuestionList.css";
import "../StyleSheet/QuestionBox.css";

import { Link } from "react-router-dom";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    axios.get("/api/all-questions").then((response) => {
      console.log(response);
      setQuestions(response.data);
    });
  }, []);

  const Like = (ID) => {
    const url = "/api/likes";

    const data = new FormData();
    data.append("id", ID);

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="QuestionList">
        <div id="QuestionSearch" style={{ marginTop: "20px" }}>
          <div className="QuestionBox_inputField">
            <input
              type="text"
              placeholder="Search for a question"
              className="QuestionBox_inputfield"
              id="searchBar"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>
        {questions && (
          <div className="Questions">
            {questions
              .filter((val) => {
                if (search == "") {
                  return val;
                } else if (
                  val.question.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((question) => {
                return (
                  <div className="question" key={question._id}>
                    <div className="question__profile">
                      <Avatar src={question.owner_image} alt="User Profile" />
                      <h4>{question.owner}</h4>
                    </div>
                    <div className="question__info">
                      <div className="question__question">
                        <h4 style={{ fontWeight: "600" }}>
                          {question.question}
                        </h4>
                      </div>
                    </div>
                    <div className="question__stats">
                      <div className="likes" style={{ cursor: "pointer" }}>
                        <ThumbUpIcon onClick={() => Like(question._id)} />
                        <h4>{question.upvotes}</h4>
                      </div>
                      <Link
                        className="comments"
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/questions/${question._id}`} /*onClick={()=> QuestionID(question._id)}*/
                      >
                        {" "}
                        {/* to redirect user to /answer page */}
                        <div
                          className="comments"
                          style={{ cursor: "pointer", textDecoration: "none" }}
                        >
                          <ChatIcon />
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })
              .reverse()}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
