import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import Footer from '../SplashPage/Footer';

import "./LoginForm.css";
import InspiredLogo from '../../images/inspiredText.png';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const history = useHistory();

  const routeChange = () =>{
    history.push('/');
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/explore" />;
  }

  return (
    <div className="login_main_container">
      <div className="content">
      <img src={InspiredLogo} alt="inspired logo" onClick={routeChange} className="logo"/>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            {/* <div>
              <label htmlFor="email">Email</label>
            </div> */}
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
              className="email"
              required
              maxLength={100}
            />
          </div>
          <div>
            {/* <div>
              <label htmlFor="password">Password</label>
            </div> */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              className="password"
              required
              minLength={5}
              maxLength={50}
            />
            <div>
              <button type="submit" className="submit">Login</button>
            </div>
            <span className="register_span">Not Registered? </span>
            <NavLink to="/sign-up" className="register_link">Create an account</NavLink>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
