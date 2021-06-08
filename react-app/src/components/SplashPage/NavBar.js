import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "../../store/session";
import LogoutButton from '../auth/LogoutButton';

import inspiredLogo from '../../images/inspiredText.png';
import "./NavBar.css";

const NavBar = () => {

    const dispatch = useDispatch();

    const demoLogin = async (e) => {
        const email = 'demo@aa.io';
        const password = 'password';
        e.preventDefault();
        await dispatch(login(email, password));
    }

    //   if (user) {
    //     return <Redirect to="/explore" />;
    //   }

    return (
        <div className="navbar">
            <div className="navbar-wrapper_img_about">
                <div className="navbar-img">
                    <img src={inspiredLogo} alt="inspired logo"></img>
                </div>
                <div className="navbar-about">
                    <NavLink className="about_link" to="/about">About</NavLink>
                </div>
            </div>
            <div className="navbar-wrapper_demo_login">
                <div className="navbar-demo_user">
                    <button onClick={demoLogin} className="demo_user">Demo User</button>
                </div>
                <div className="navbar-login_btn">
                    <NavLink to="/login" exact={true} className="login_btn"> Login </NavLink>
                </div>
            </div>
        </div>
    );
}

export default NavBar;


{/* <NavLink to="/sign-up" exact={true} activeClassName="active">
Sign Up
</NavLink> */}
