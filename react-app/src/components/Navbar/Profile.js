import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';

import "./UserNavbar.css";

const Profile = () => {
    const [showMenu, setShowMenu] = useState(false);

    const user = useSelector(state => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div className="UserNavBar-user_account">
            <button className="menu_btn" onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && (
                <div className="profile-dropdown">
                    <NavLink className="links my_profile_link" to={`/users`}><i className="far fa-user"></i> Profile</NavLink>
                    <NavLink className="links my_profile_quotes" to={`/users/quotes`}><i className="fas fa-pencil-alt"></i> My Quotes</NavLink>
                    <NavLink className="links my_profile_favorites" to={`/users/favorites`}><i className="fas fa-heart"></i> Favorites</NavLink>
                    <NavLink className="links my_profile_collections" to={`/users/collections`}><i className="fas fa-tag"></i> Collections</NavLink>
                    <LogoutButton />
                    <NavLink className="links" id="my_profile_explore" to="/explore">Explore</NavLink>
                </div>
            )}
        </div>
    );
}

export default Profile;
