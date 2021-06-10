import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import UserNavBar from '../Explore/UserNavBar';
import Footer from '../SplashPage/Footer';

import "./Favorite.css";

function Favorite() {
  // const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const user = useSelector(state => state.session.user);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <UserNavBar />
      <div>

      </div>
      <Footer />
    </div>
  );
}
export default Favorite;
