import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import Footer from '../SplashPage/Footer';

import "./SignUpForm.css";
import InspiredLogo from '../../images/inspiredText.png';

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const history = useHistory();

  const routeChange = () => {
    history.push('/');
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/explore" />;
  }

  return (
    <div className="sign_up_container">
      <div className="sign_up-content">
        <img src={InspiredLogo} alt="inspired logo" onClick={routeChange} className="logo" />
        <form onSubmit={onSignUp}>
          <div>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              placeholder="User Name"
              className="sign_up-username"
            ></input>
          </div>
          <div>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              placeholder="Email"
              className="sign_up-email"
            ></input>
          </div>
          <div>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              placeholder="Password"
              className="sign_up-password"
            ></input>
          </div>
          <div>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder="Repeat Password"
              className="sign_up-repeat_password"
            ></input>
          </div>
          <div>
            <button type="submit" className="sign_up-submit">Sign Up</button>
          </div>
          <NavLink to="/login" className="sign_up-login_link">Already have an account?</NavLink>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpForm;
