import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Modal from "react-modal";
import { getQuotesByUser, editQuote, deleteQuote } from '../../store/quote';
import UserNavBar from '../Explore/UserNavBar';
import Footer from '../SplashPage/Footer';
// import QuoteEditModal from './QuoteEditModal';
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
      <div className="quote-body_content">
        <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <h1>Edit Quote</h1>
          <form onSubmit={onSubmit}>
            <label htmlFor="content">Content</label>
            <input value={content} onChange={e => setContent(e.target.value)} placeholder="Edit quote here..." />
            <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Edit author here..." />
            <button onClick={() => setModalIsOpen(false)}>Close</button>
            <button type="submit">Submit quote</button>
          </form>
          <h1>Delete Quote</h1>
          <button onClick={onClickDeleteQuote}>Delete This Quote</button>
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


// {
//   showMenu && (
//     <div className="quote-body_content-settings">
//       <p onClick={() => setModalIsOpen(true)}>Edit</p>
//       <p onClick={() => setModalIsOpen(true)}>Delete</p>
//     </div>
//   )
// }
