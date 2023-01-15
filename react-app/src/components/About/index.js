import React from 'react';
import bio from "../../images/bio.JPG";
import "./About.css";

const About = () => {

    return (
        <div className="about_main_wrapper">
            <div className="aboutme-container">
                <div className="profile">
                    <img src={bio} alt="profile image" className="profile-img" />
                    <span className="name">Hector Crespo</span>
                    <p className="job-role">Full Stack Software Engineer</p>
                </div>
                <div className="about-links">
                    <a className="github_icon" href="https://github.com/crespohector" target="_blank">
                        <i className="fab fa-github"></i>
                    </a>
                    <a className="linkedin_icon" href="http://linkedin.com/in/hector-crespo-b0b5b019a" target="_blank">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
                <div className="intro-bio">
                    <p className="hello">Hi there!</p>
                    <p className="hello_sentence">Here's who I am and what I do</p>
                    <p className="intro_one">I love the result of building full stack web applications from the ground-up. I am a problem-solver and enjoy debugging errors and figuring out solutions. I'm an enthusiastic teammate and have a passion for learning new technologies. I have experience building dynamic web applications in HTML5, CSS3, JavaScript, React.js, Python, Node.js, Express.js, Flask, SQLAlchemy, Alembic, Sequelize, PostgreSQL, SQLite3 and Playwright.</p>
                </div>
            </div>
        </div>
    );
}

export default About;
