import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

import "./LogoutButton.css";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    dispatch(logout());
  };

  return <button onClick={onLogout} className="auth-logout_btn"><i className="fas fa-sign-out-alt"></i> Logout</button>;
};

export default LogoutButton;
