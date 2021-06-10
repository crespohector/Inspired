import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {getQuotesByUser} from '../../store/quote';
import UserNavBar from '../Explore/UserNavBar';
import Footer from '../SplashPage/Footer';

import "./Quote.css";

function Quote() {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const quotes = useSelector(state => state.quote);
  const quotesArr = Object.values(quotes).filter(quote => quote.owner_id == userId);

  useEffect(() => {
    dispatch(getQuotesByUser(userId))
  }, [dispatch])

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <UserNavBar />
      <div className="quote-body_content">
          <span className="quote-body_content-header">My Quotes</span>
          {quotesArr.map(quote => (
            <div key={quote.id} className="quote-body_content-content">
              <span className="quote-body_content-content_quote">{quote.content}</span>
              <span className="quote-body_content-content_option"><i className="fas fa-ellipsis-v"></i></span>
              <span className="quote-body_content-content_author">- {quote.author}</span>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
export default Quote;
