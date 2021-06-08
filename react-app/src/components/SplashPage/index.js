import React from 'react';
import NavBar from './NavBar';
import { NavLink } from 'react-router-dom';
import Footer from "./Footer";

import "./SplashPage.css"
import backgroundImage from '../../images/backgroundImg.jpg';

const SplashPage = () => {
    return (
        <div className="main_container">
            <NavBar />
            <div className="body_container">
                <p className="header-1">
                    Empower yourself by verbally affirming your goals and ambitions
                </p>
                <p className="header-2">
                    Strengthen the connection between your unconscious mind and your consious mind
                </p>
                <p className="header-3">
                    Challenge yourself to grow and become the person you envision
                </p>
                <p className="header-4">
                    Choose from many daily quotes and create your own collection of favorite quotes
                </p>
                <NavLink className="sign_up" to="/sign-up">Create Account</NavLink>
            </div>
            <Footer />
        </div>
    )
}


export default SplashPage;