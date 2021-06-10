import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {getFavorites} from '../../store/favorite';
import UserNavBar from '../Explore/UserNavBar';
import Footer from '../SplashPage/Footer';

import "./Favorite.css";

function Favorite() {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorite);
  const favoritesArr = Object.values(favorites)

  // console.log("----favorites arr: ", favoritesArr)

  useEffect(() => {
    dispatch(getFavorites(userId))
  }, [dispatch])

  if (!user) {
    return <Redirect to="/" />;
  }

  //TODO-if the user clicks the heart it will unlike the quote and
  //make sure to change the picture of the heart to empty maybe

  return (
    <div>
      <UserNavBar />
      <div className="favorite-body_content">
          <span className="favorite-body_content-header">Favorites</span>
          {favoritesArr.map(favorite => (
            <div key={favorite.id} className="favorite-body_content-content">
              <span className="favorite-body_content-content_favorite">{favorite.content}</span>
              <span className="favorite-body_content-content_option"><i className="fas fa-heart"></i></span>
              <span className="favorite-body_content-content_author">- {favorite.author}</span>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
export default Favorite;
