import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {getFavorites, unlikeQuote} from '../../store/favorite';
import Footer from '../SplashPage/Footer';

import "./Favorite.css";

function Favorite() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorite);
  const favoritesArr = Object.values(favorites)

  useEffect(() => {
    dispatch(getFavorites(user.id))
  }, [dispatch])


  const onClickUnlikeQuote = (favorite) => {
    const quoteId = favorite.id
    const intUserId = parseInt(user.id)
    dispatch(unlikeQuote(intUserId, quoteId))
  }

  return (
    <div>
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
