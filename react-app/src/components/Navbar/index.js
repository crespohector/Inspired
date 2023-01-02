import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "../../store/session";

import Profile from './Profile';
import inspiredLogo from '../../images/inspiredText.png';
import "./UserNavbar.css";

const UserNavBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const demoLogin = async (e) => {
        const email = 'demo@aa.io';
        const password = 'password';
        e.preventDefault();
        await dispatch(login(email, password));
    }

    const handleClick = () => {
        history.push('/')
    }

    return (
        <div className="UserNavBar">
            <div className="UserNavBar-wrapper_img_about">
                <div onClick={handleClick} className="UserNavBar-img">
                    <img src={inspiredLogo} alt="inspired logo"></img>
                </div>
                <div className="UserNavBar-about">
                    <NavLink className="about_link" to="/about">About</NavLink>
                </div>
            </div>
            {user ? <Profile /> :
                <div className="navbar-wrapper_demo_login">
                    <button onClick={demoLogin} className="demo_user">Demo User</button>
                    <NavLink to="/login" exact={true} className="login_btn"> Login </NavLink>
                </div>}
        </div>
    );
}

export default UserNavBar;
