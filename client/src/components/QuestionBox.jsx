import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import "../StyleSheet/QuestionBox.css";

const QuestionBox = () => {
    return (
        <div className="QuestionBox">
            <div className="questionBox_user">
                <Avatar src="" 
                alt="user profile" />
                <h4 className="user_username">Akshay</h4>
            </div>

            <input type="text" 
            placeholder="What is your question ?" 
            className="QuestionBox_inputfield"
            />
        </div>
    )
}

export default QuestionBox
