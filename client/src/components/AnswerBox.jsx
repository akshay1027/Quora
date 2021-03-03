
//======= to get form data(answer for the question) and send (post request) to backend ==========

import React,{useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import "../StyleSheet/QuestionBox.css";

const AnswerBox = ({profileimage, authStatus}) => {
    
    const [question, setQuestion] = useState("");
    
    const AskQuestion = async () => {
        const form_data = new FormData();
        form_data.append("question", question);
        
        const url = "http://localhost:5000/ask-question";
        
        try {
        const response = await axios.post(url, form_data, {
            withCredentials: true,
        });
        
        alert(response.data.msg);
        } catch (error) {
        alert(error.response.data.msg);
        }
    };

    return (
        <div className="QuestionBox">
            <div className="questionBox_user">
                <Avatar src={profileimage} 
                alt="user profile" />
                <h4 className="user_username">Akshay</h4>
            </div>
            
            <div className="QuestionBox_inputField">
                <input type="text" 
                placeholder="What is your answer ?" 
                className="QuestionBox_inputfield"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                />
                <button
                disabled={authStatus === true ? false : true} //allow to ask question only if user is logged in!
                className="QuestionBox__btn"
                onClick={AskQuestion}
                >
                Answer
                </button>
            </div>
        </div>
    )
}

export default AnswerBox;
