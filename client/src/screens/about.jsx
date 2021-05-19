import React from "react";
import Grid from "@material-ui/core/Grid";
import "../StyleSheet/About.css";
import { ReactComponent as ReactLogo } from "../images/data.svg";
import { ReactComponent as ReactLogo2 } from "../images/proud.svg";
import SecurityIcon from "@material-ui/icons/Security";
import StorageIcon from "@material-ui/icons/Storage";
import DomainDisabledIcon from "@material-ui/icons/DomainDisabled";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <Grid container className="main" id="about">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="main__content" id="hero">
            <h2>
              <h1>PEC QUORA</h1>
              <br />
              <h4>Have a question that needs to be Answered?</h4>
              <h4>Wanna connect with amazing people?</h4>
            </h2>
            <br />
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/signup"
            >
              <button className="redirect">Start Now!</button>
            </Link>
            <h2 style={{ marginTop: "10px" }}>
              <h4>Scroll down to know more ⬇</h4>
            </h2>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="main-img-container">
            <ReactLogo className="illustration" />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className="main__content">
            <h1 id="brand">Why QUORA? </h1>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginTop: "7rem" }}>
          <div className="main-img-container">
            <ReactLogo2 className="illustration2" />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="main__content">
            <h2>
              PEC Quora is a Multifunctinal website for Pondicherry Engineering
              College. <br />
              <br />
              Attempting to: <br />
              1) Bridge the gap between students & passouts. <br />
              2) Help students with carrer guidance, solving their problems.{" "}
              <br />
              <br />
              {/* The students are unaware of the various opportuities that exist around India and especially now due to Covid-19, the interactions between seniors and juniors is non existent. */}
              This project is made with MERN stack and is Open sourced.
              <br />
              Here is the code, star the repo ♥:
            </h2>
            <br />

            <a
              style={{ textDecoration: "none", color: "black" }}
              href="https://github.com/akshay1027/pecquora"
              target="_blank"
            >
              <button className="redirect">Github repo</button>
            </a>
          </div>
        </Grid>
      </Grid>
      <Grid class="row">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className="main__content">
            <h1 id="brand" style={{ marginBottom: "40px", marginTop: "20px" }}>
              Features{" "}
            </h1>
          </div>
        </Grid>
        <div class="card">
          <div class="card-header">
            <h4>Frontend:</h4>
            <DomainDisabledIcon className="card-icon" />
          </div>
          <div class="card-body">
            <p>
              <ul>
                <li> Asking Questions</li>
                <li> Answering asked Questions</li>
                <li>read others Answers</li>
                <li>Up voting Questions and Answers</li>
              </ul>
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h4 style={{ fontSize: "25px" }}>Authentication:</h4>
            <SecurityIcon className="card-icon" />
          </div>

          <div class="card-body">
            <p>
              <ul>
                <li>Sign In</li>
                <li>Sign Up</li>
                <li>Profile Image uploads</li>
                <li>Server-Side cookies handling</li>
              </ul>
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h4>Backend:</h4>
            <StorageIcon className="card-icon" />
          </div>
          <div class="card-body">
            <p>
              <ul>
                <li>REST API Endpoints architecture</li>
                <li>No SQL Database Modal</li>
                <li>Hashing of passwords</li>
                <li>Storing profile images</li>
              </ul>
            </p>
          </div>
        </div>
      </Grid>
      <Grid className="row" item xs={12} sm={12} md={12} lg={12}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className="main__content">
            <h1
              id="brand"
              style={{
                marginBottom: "40px",
                marginTop: "0px",
                fontSize: "2.5rem",
              }}
            >
              Developer
            </h1>
          </div>
        </Grid>
        <div class="card">
          <div class="card-header2">
          <img src="https://res.cloudinary.com/dwe7nnirb/image/upload/c_scale/w_200/v1614236058/pecquora/profileimage/akshayrr10/nv6kjlmyuujrw5hmbgi4.jpg" alt="Akshay RR" style={{ borderRadius: "50%"}}/>
          <div style={{ fontWeight: 700, fontSize: "20px", margin: "10px 0px 0px 0px"}}> Akshay R R</div>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="https://github.com/akshay1027/"
              target="_blank"
            >
              <GitHubIcon className="developer-icon" />
            </a>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="https://www.linkedin.com/in/akshayrr1027/"
              target="_blank"
            >
              <LinkedInIcon className="developer-icon" />
            </a>
          </div>
          <div class="card-body" id="developer">
            <p style={{ fontSize: '17px'}}>
              I am a second year student at PTU (formerly PEC), Pondicherry,
              pursuing my Bachelors in ECE.
              <br />
              <br />
              Full stack web developer.
              <br />
              <br />
              Ideation + Technology!
            </p>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default About;
