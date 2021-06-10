import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import UserNavBar from '../Explore/UserNavBar';
import Footer from '../SplashPage/Footer';

import "./Collection.css";

function Collection() {
  // const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const user = useSelector(state => state.session.user);

  if (!user) {
    return <Redirect to="/" />;
  }
//copy quote and the three dots and have it say edit collection

  return (
    <div>
      <UserNavBar />
      <div>

      </div>
      <Footer />
    </div>
  );
}
export default Collection;
