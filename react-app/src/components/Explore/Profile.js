import React, { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';

import "./Profile.css";

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
                    <NavLink className="links my_profile_link" to={`/users/${user.id}`}>Profile</NavLink>
                    <NavLink className="links my_profile_quotes" to={`/users/${user.id}/quotes`}>My Quotes</NavLink>
                    <NavLink className="links my_profile_favorites" to={`/users/${user.id}/favorites`}>Favorites</NavLink>
                    <NavLink className="links my_profile_collections" to={`/users/${user.id}/collections`}>Collections</NavLink>
                    <LogoutButton />
                    <NavLink className="links" id="my_profile_explore" to="/explore">Explore</NavLink>
                </div>
            )}
        </div>
    );
}

export default Profile;
