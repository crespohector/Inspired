import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../Navbar';
import Footer from '../SplashPage/Footer';

import "./User.css";

function User() {
  const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  // If not the correct user then redirect to 404 page.
  // Authenticate the user

  return (
    <div>
      <Navbar />
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
