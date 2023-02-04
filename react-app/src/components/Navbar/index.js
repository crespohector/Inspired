import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "../../store/session";

import Profile from './Profile';
import inspiredLogo from '../../images/inspiredText.png';
import "./UserNavbar.css";

const UserNavBar = () => {
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const demoLogin = async (e) => {
        const email = 'demo@aa.io';
        const password = 'password';
        e.preventDefault();
        await dispatch(login(email, password));
    }

    const toggleDropDownMenu = () => {
        if (!toggle) setToggle(true);
        else setToggle(false);
    }

    return (
        <nav className="UserNavBar">
            <div className="UserNavBar-wrapper_img_about">
                <NavLink to="/" className="UserNavBar-img">
                    <img src={inspiredLogo} alt="inspired logo" />
                </NavLink>
                <div className="UserNavBar-about">
                    <NavLink className="about_link" to="/about">About</NavLink>
                </div>
            </div>
            {user ? <Profile /> :
                <>
                    {/* Display dropdown menu if screen is less than 425px */}
                    <div className="dropdown">
                        <button onClick={toggleDropDownMenu} className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        {toggle &&
                            (<div className="toggle-menu">
                                <NavLink className="menu-item" to="/about">About</NavLink>
                                <NavLink to="/login" exact={true} className="menu-item">Login</NavLink>
                                <button onClick={demoLogin} className="menu-item">Demo User</button>
                            </div>)}
                    </div>

                    {/* Display if screen is > than 425px */}
                    <div className="navbar-wrapper_demo_login">
                        <button onClick={demoLogin} className="demo_user">Demo User</button>
                        <NavLink to="/login" exact={true} className="login_btn"> Login </NavLink>
                    </div>
                </>
            }
        </nav>
    );
}

export default UserNavBar;
