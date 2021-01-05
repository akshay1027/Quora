import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LanguageIcon from '@material-ui/icons/Language';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from "@material-ui/core";
import "../StyleSheet/Header.css";

const Header = () => {
    return(
        <div className="header">

            {/*left side */}

         <div className="header_left">

            <div className="left_logo">
                   <h4 className="company logo">PEC Quora</h4>
            </div>
            <div className="left_home">
                <HomeIcon />
                <h4>Home</h4>
            </div>
            <div className="left_notification">
                <NotificationsIcon />
                <h4>Notifications</h4>
            </div>
        
          </div>

           {/*center side */}

           <div className="header_center">
               <input type="text" placeholder="search" />
               <SearchIcon />
           </div>

           {/*right side */}

           <div className="header_right">
               <div className="right_user">
                   <Avatar src=" " alt="user profile" />
               </div>
               <LanguageIcon />
               <button>Ask Questions</button>
           </div>

        </div>
            
    )
}; 

export default Header;