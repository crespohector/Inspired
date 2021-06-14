import React from 'react';
import { NavLink } from 'react-router-dom';
import UserNavBar from '../Explore/UserNavBar'

import bio from "../../images/bio.JPG";
import "./About.css";

const About = () => {
    return (
        <div className="about_main_wrapper">
            <UserNavBar />
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
                    <p className="right_content-intro_one">After earning my bachelor's degree in computer science
                    from New Jersey City University, I entered the tech industry to explore my passion for developing websites and learning
                    new technology. Dolor esse officia aliquip sint sint ex pariatur excepteur consequat. Do Lorem laborum voluptate magna Lorem do eiusmod culpa commodo minim magna laboris aliquip culpa. Irure officia in nostrud esse eu consectetur amet Lorem minim laboris eu reprehenderit. Nostrud culpa culpa excepteur sit magna laborum. Elit eiusmod pariatur fugiat minim excepteur qui culpa occaecat magna qui irure sit.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
