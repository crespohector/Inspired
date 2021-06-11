import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {getFavorites, unlikeQuote} from '../../store/favorite';
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

  const onClickUnlikeQuote = (favorite) => {
    // console.log("favorite: ", favorite.id)
    const quoteId = favorite.id
    const intUserId = parseInt(userId)
    dispatch(unlikeQuote(intUserId, quoteId))
  }

  return (
    <div>
      <UserNavBar />
      <div className="favorite-body_content">
          <span className="favorite-body_content-header">Favorites</span>
          {favoritesArr.map(favorite => (
            <div key={favorite.id} className="favorite-body_content-content">
              <span className="favorite-body_content-content_favorite">{favorite.content}</span>
              <span className="favorite-body_content-content_option" onClick={() => onClickUnlikeQuote(favorite)}><i className="fas fa-minus-circle"></i></span>
              <span className="favorite-body_content-content_author">- {favorite.author}</span>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
export default Favorite;
