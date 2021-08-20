//= ======== to get data (get request) from backend and display over here ==========

import React, { useState, useEffect } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import axios from '../helper/axioshelper';
import Avatar from '@material-ui/core/Avatar';
import '../StyleSheet/QuestionList.css';

const QuestionList = (props) => {
    const [answers, setAnswer] = useState([]);

    const questionID = props.questionID; // question id from url
    // const profileImage = props.profileImage;
    // const authStatus = props.authStatus;

    useEffect(() => {
        axios
            .get(`/api/all-answer/${questionID}/`)
            .then((response) => {
                console.log(response.data);
                setAnswer(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const Like = (ID) => {
        const data = new FormData();
        data.append('id', ID);

        axios
            .post(`/api/answers/likes/${questionID}/`, data, {
                withCredentials: true
            })
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
     4. check if id is present in answers db or send the id back
     5. make get request and display the id!
    */

    return (
        <div className="QuestionList">
            {answers && (
                <div className="Questions">
                    {answers
                        .map((answer) => {
                            return (
                                <div className="question" key={answer._id}>
                                    <div className="question__profile">
                                        <Avatar src={answer.owner_image} alt="User Profile" />
                                        <h4>{answer.owner}</h4>
                                    </div>
                                    <div className="question__info">
                                        <div className="question__question">
                                            <h4>{answer.text}</h4>
                                        </div>
                                        <div className="question__stats">
                                            <div className="likes" style={{ cursor: 'pointer' }}>
                                                <ThumbUpIcon onClick={() => Like(answer._id)} />
                                                <h4>{answer.upvotes}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        .reverse()}
                </div>
            )}
        </div>
    );
};

export default QuestionList;

/* <div className="QuestionList">
          { answers ? (
            <div className="Questions">
            { answers.map((answer) => {
                return (
                <div className="question" key={answer._id}>
                    <div className="question__profile">
                      <Avatar src={answer.owner_image} alt="User Profile" />
                      <h4>{answer.owner}</h4>
                    </div>
                     <div className="question__info">
                      <div className="question__question">
                            <h4 >{answer.text}</h4>
                      </div>
                      <div className="question__stats">
                        <div className="likes" style={{ cursor: "pointer" }}>
                          <ThumbUpIcon onClick={() => Like(answer._id)} />
                          <h4>{answer.upvotes}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
            </div>
          ) : <div className="question" style={{marginTop:"50px", padding:"30px 2px"}}>
          <div className="question__question">
            <h4 >No answers for this question as of now, Go ahead and give yours answer!</h4>
            </div>
            </div>
            }
        </div>

        */
