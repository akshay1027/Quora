import React,{useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import "../StyleSheet/QuestionBox.css";

const AnswerBox = ({profileimage, authStatus}) => {
    
    const [question, setQuestion] = useState("");
    
    
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
               
                >
                Answer
                </button>
            </div>
        </div>
    )
}

export default AnswerBox;
