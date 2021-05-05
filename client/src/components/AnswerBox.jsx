
//======= to get form data(answer for the question) and send (post request) to backend ==========

import React,{useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import axios from "../helper/axioshelper";
import "../StyleSheet/QuestionBox.css";

const AnswerBox = ({profileImage, authStatus, questionID}) => {
    
    const [answer, setAnswer] = useState("");
    
    const askAnswer = async () => {
        const form_data = new FormData();
        form_data.append("comments", answer);
        
        try {
        const response = await axios.post(`/api/send-answer/${questionID}/`, form_data, {
            withCredentials: true,
        });
        
        alert(response.data.msg);
        } catch (error) {
        alert(error.response.data.msg);
        }
    };

    return (
        <div className="questionBackground">
        <div className="QuestionBox">
            <div className="questionBox_user">
                <Avatar src={profileImage} 
                alt="user profile" />
                <h4 className="user_username">Akshay</h4>
            </div>
            
            <div className="QuestionBox_inputField">
                <input type="text" 
                placeholder="What is your answer ?" 
                className="QuestionBox_inputfield"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                />
                <button
                disabled={authStatus === true ? false : true} //allow to ask answer only if user is logged in!
                className="QuestionBox__btn"
                onClick={askAnswer}
                >
                Answer
                </button>
            </div>
        </div>
        </div>
    )
}

export default AnswerBox;
