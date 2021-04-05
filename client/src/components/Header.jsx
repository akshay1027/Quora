import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from "@material-ui/core/Avatar";
import "../StyleSheet/Header.css";

  const Header = ({profileImage}) => {
    
    // to get window location!
    const location = window.location.href;

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
               <input type="text" 
               placeholder="search"
               className="center_inputfield" />
               <SearchIcon />
           </div>

           {/*right side */}

           <div className="header_right">
               <div className="right_user">
                   <Avatar src={profileImage} alt="user profile" />
               </div>
               <button className="right_btn"><a href="/signup" className="right_btn_a">Sign Up</a></button>
               <button className="right_btn"><a href="/signin" className="right_btn_a">Sign In</a></button>
           </div>

        </div>
            
    )
}; 

export default Header;