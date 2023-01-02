import React from 'react';
import Navbar from '../Navbar'

import bio from "../../images/bio.JPG";
import "./About.css";

const About = () => {

    return (
        <div className="about_main_wrapper">
            <Navbar />
            <div className="about_me_container">
                <div className="left_content">
                    <div className="left_content-bio">
                        <img src={bio} alt="bio" className="bio"/>
                        <span className="first_name">Hector</span>
                        <span className="last_name">Crespo</span>
                        <p className="role">Full Stack Software Engineer</p>
                    </div>
                    <div className="left_content-links">
                        <a className="left_content-github_icon" href="https://github.com/crespohector/Inspired" >
                            <i className="fab fa-github"></i>
                        </a>
                        <a className="left_content-linkedin_icon" href="http://linkedin.com/in/hector-crespo-b0b5b019a" >
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
                <div className="right_content">
                    <span className="right_content-hello">Hello</span>
                    <p className="right_content-hello_sentence">Here's who I am and what I do</p>
                    <p className="right_content-intro_one">I love the result of building full stack web applications from the ground-up. I am a problem-solver and enjoy debugging errors and figuring out solutions. I'm an enthusiastic teammate and have a passion for learning new technologies. I have experience building dynamic web applications in JavaScript, Python, React, Flask, SQLAlchemy, Express.js, Node.js, and PostgreSQL. When I am not coding, I take delight in eating delicious food, listening to podcasts, and excercising.</p>
                </div>
            </div>
        </div>
    );
}

export default About;
