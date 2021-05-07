import React from "react";
import Grid from "@material-ui/core/Grid";
import "../StyleSheet/About.css";
import {ReactComponent as ReactLogo} from '../images/data.svg';
import {ReactComponent as ReactLogo2} from '../images/proud.svg';


const About = () => {
    return (
    <div>
        <Grid container spacing={2} className="main" id="about">
            <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="main__content">
                    <h2>
                    <h1>PEC QUORA</h1><br />
                    Awareness is key to success. <br />
                    <h4>Have a question that needs <br />
                    to be Answered by our Alumi?</h4>       
                    </h2>
                    <br />                    
                    <button className="redirect">start right away!</button>
            </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="main-img-container">
                <ReactLogo className="illustration"/>
            </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
            <h1 id="brand">About Us </h1>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} style={{marginTop: "7rem"}}>
            <div className="main-img-container">
                <ReactLogo2 className="illustration2"/>
            </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} >
            <div className="main__content" >
                    <h2>
                    This Repository is created with a motive to <span>guide beginners</span> with the <span>open-source</span> and with big <span>react projects</span> .
                    </h2>
            </div>
            </Grid>
        </Grid>
    </div>
    );
};

export default About;