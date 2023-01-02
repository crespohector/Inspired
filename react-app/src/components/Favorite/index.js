import React, { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {getFavorites, unlikeQuote} from '../../store/favorite';
import Navbar from '../Navbar';
import Footer from '../SplashPage/Footer';

import "./Favorite.css";

function Favorite() {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorite);
  const favoritesArr = Object.values(favorites)

  useEffect(() => {
    dispatch(getFavorites(userId))
  }, [dispatch])

  if (!user) {
    return <Redirect to="/" />;
  }

  const onClickUnlikeQuote = (favorite) => {
    const quoteId = favorite.id
    const intUserId = parseInt(userId)
    dispatch(unlikeQuote(intUserId, quoteId))
  }

  return (
    <div>
      <Navbar />
      <div className="favorite-body_content" id="scrollbar">
          <span className="favorite-body_content-header">Favorites</span>
          {favoritesArr.reverse().map(favorite => (
            <div key={favorite.id} className="favorite-body_content-content">
              <div className="favorite-body_content-content_favorite">{favorite.content}</div>
              <div className="favorite-body_content-content_option" onClick={() => onClickUnlikeQuote(favorite)}><i className="fas fa-minus-circle"></i></div>
              <div className="favorite-body_content-content_author">- {favorite.author}</div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
export default Favorite;
