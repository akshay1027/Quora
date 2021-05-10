import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import "../StyleSheet/NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Pec Quora
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/quora"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Quora
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/signin"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Sign In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/signup"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
              Sign Up
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}><MenuIcon style={{fontSize: "30px", marginTop:"3px"}}/></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;