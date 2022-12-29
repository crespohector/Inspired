import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Modal from "react-modal";
import { getQuotesByUser, editQuote, deleteQuote } from '../../store/quote';
import UserNavBar from '../Explore/UserNavBar';
import Footer from '../SplashPage/Footer';
import CreateQuote from './CreateQuote';

import "./Quote.css";

Modal.setAppElement('#root');

function Quote() {
  const [content, setContent] = useState(''); //
  const [author, setAuthor] = useState(''); //
  const [quoteId, setQuoteId] = useState(null); //
  // const [showMenu, setShowMenu] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const quotes = useSelector(state => state.quote);
  const quotesArr = Object.values(quotes).filter(quote => quote.owner_id == userId);

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  // useEffect(() => {
  //   if (!showMenu) return;
  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };
  //   document.addEventListener('click', closeMenu);
  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const onSubmit = (e) => {
    e.preventDefault();
    setContent('');
    setAuthor('');
    dispatch(editQuote(content, author, quoteId));
    setModalIsOpen(false)
  }

  const onClickOptions = (quote) => {
    setModalIsOpen(true);
    setQuoteId(quote.id)
  }

  const onClickDeleteQuote = (e) => {
    e.preventDefault();
    dispatch(deleteQuote(quoteId))
    setModalIsOpen(false)
  }


  useEffect(() => {
    dispatch(getQuotesByUser(userId))
  }, [dispatch])

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <UserNavBar />
      <div className="quote-body_content" id="scrollbar">
        <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <form onSubmit={onSubmit} className="was-validated form">
            <label htmlFor="quote-input" className="form-label"><strong>Quote*</strong></label>
            <textarea id="quote-input" className="form-control" value={content} onChange={e => setContent(e.target.value)} placeholder="Edit quote here..." required></textarea>
            <label htmlFor="author-input" className="form-label"><strong>Author</strong></label>
            <input type="text" id="author-input" className="form-control" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Edit author here..." />
            <button className="btn btn-outline-secondary" id="quote-button" onClick={() => setModalIsOpen(false)}>Close</button>
            <button id="quote-button" className="btn btn-outline-dark" type="submit">Edit This Quote</button>
          </form>
          <button className="btn btn-outline-danger" onClick={onClickDeleteQuote}>Delete This Quote</button>
        </Modal>

        <CreateQuote />
        <span className="quote-body_content-header">My Quotes</span>
        {quotesArr.map(quote => (
          <div key={quote.id} className="quote-body_content-content">
            <span className="quote-body_content-content_quote">{quote.content}</span>
            <span className="quote-body_content-content_option" onClick={() => onClickOptions(quote)}>
              <i className="fas fa-edit"></i>
            </span>
            <span className="quote-body_content-content_author">- {quote.author}</span>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
export default Quote;
