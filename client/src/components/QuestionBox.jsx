import React,{useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import axios from "../helper/axioshelper";
import "../StyleSheet/QuestionBox.css";

const QuestionBox = ({profileImage, authStatus}) => {
    
    const [question, setQuestion] = useState("");
    
    const AskQuestion = async () => {
        const form_data = new FormData();
        form_data.append("question", question);

        const server1 = process.env.NODE_ENV === "production"
         ? "https://pecquora-backend.herokuapp.com/api/ask-question/" : "http://localhost:5000/api/ask-question/";
    
         const url = server1;
        
       
        
        try {
        const response = await axios.post("/api/ask-question", form_data, {
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
                placeholder="What is your question ?" 
                className="QuestionBox_inputfield"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                />
                <button
                disabled={authStatus === true ? false : true} //allow to ask question only if user is logged in!
                className="QuestionBox__btn"
                onClick={AskQuestion}
                >
                Ask Question
                </button>
            </div>
        </div>
        </div>
    )
}

export default QuestionBox;
