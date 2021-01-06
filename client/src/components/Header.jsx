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

    const location = window.location.href;
    alert(location);
    return(
        <div className="header">

            {/*left side */}

         <div className="header_left">

            <div className="left_logo">
                   <h4 alt="PEC logo" className="left_logotext" >PEC Quora</h4>
            </div>
            <div className={`left_home ${location === "http://localhost:3000/" ? "current-location" : null}`}>
                <HomeIcon />
                <h4>Home</h4>
            </div>
            <div className={`left_notification ${location === "http://localhost:3000/notifications" ? "current-location" : null} `}>
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