import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../../store/session";

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



//react router dom
// let urlPath = useLocation();
//  let path = urlPath.pathname.split("/");
