import React from "react";

import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer_container">
            <div className="footer_container-content">
                <span className="dev_name">@ Hector Crespo</span>
                <a className="github_icon" href="https://github.com/crespohector/Inspired" >
                    <i className="fab fa-github"></i>
                </a>
                <a className="linkedin_icon" href="http://linkedin.com/in/hector-crespo-b0b5b019a" >
                    <i className="fab fa-linkedin"></i>
                </a>
            </div>
        </footer>
    )
}

export default Footer;
