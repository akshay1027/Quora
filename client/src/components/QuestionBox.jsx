import React,{useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import axios from "../helper/axioshelper";
import "../StyleSheet/QuestionBox.css";

const QuestionBox = ({profileImage, authStatus, username}) => {

    const [question, setQuestion] = useState("");
    
    const AskQuestion = async () => {
        const form_data = new FormData();
        form_data.append("question", question);
     
        try {
        const response = await axios.post("/api/ask-question", form_data);
        
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
                { authStatus === true ? 
                <h4 className="user_username">{username}</h4> :
                <h4 className="user_username">No username yet! (login or Signup)</h4>
                }
            </div>
            
            <div className="QuestionBox_inputField">
                <textarea
                rows={5}
                placeholder="What is your question ?" 
                className="QuestionBox_inputfield"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                />
            </div>
            <button
                disabled={authStatus === true ? false : true} //allow to ask question only if user is logged in!
                className="QuestionBox__btn"
                onClick={AskQuestion}
                >
                Ask Question
            </button>
        </div>
        </div>
    )
}

export default QuestionBox;
