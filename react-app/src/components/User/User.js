import React from "react";
import { useSelector } from "react-redux";
import Footer from '../SplashPage/Footer';

import "./User.css";

function User() {
  const user = useSelector(state => state.session.user)

  return (
    <div>
      <div className="profile-body_content">
          <span className="profile-body_content-header">User Profile</span>
          <span className="profile-body_content-username"><strong>Username:</strong> {user.username}</span>
          <span className="profile-body_content-email"><strong>Email:</strong> {user.email}</span>
      </div>
      <Footer />
    </div>
  );
}
export default User;
