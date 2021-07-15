import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Modal from "react-modal";
import { getCollections, editCollection, deleteCollection } from '../../store/collection';
import { getCollectionQuotes, removeQuote } from '../../store/collection_quote';
import UserNavBar from '../Explore/UserNavBar';
import Footer from '../SplashPage/Footer';
import CreateCollectionBtn from './CreateCollectionBtn';

import "./Collection.css";

function Collection() {
  const [title, setTitle] = useState('');
  const [collectionId, setCollectionId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  const [errors, setErrors] = useState([]);

  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const collections = useSelector(state => state.collection);
  const collectionsArr = Object.values(collections);

  const collection_quotes = useSelector(state => state.collection_quote);
  const collection_quotes_arr = Object.values(collection_quotes);

  const onSubmit = (e) => {
    e.preventDefault();
    setTitle('');
    dispatch(editCollection(title, collectionId));
    setModalIsOpen(false)
  }

  const onClickOptions = (collection) => {
    setModalIsOpen(true);
    setCollectionId(collection.id)
  }

  const onClickDelete = (e) => {
    e.preventDefault();
    dispatch(deleteCollection(collectionId));
    setModalIsOpen(false)
  }

  useEffect(() => {
    const errors = [];
    if (title.length < 15) {
      errors.push("Title field must be greater than 15 characters");
    }
    setErrors(errors);
  }, [title])


  useEffect(() => {
    dispatch(getCollections(userId))
  }, [dispatch])

  const collectionQuoteModal = (e, collection) => {
    if (e.target.id === "fas_fa_edit") {
      return;
    }
    setSecondModalIsOpen(true);
    setCollectionId(collection.id)
    dispatch(getCollectionQuotes(collection.id))
  }

  const onClickDeleteColQuote = (quote) => {
    const quoteId = quote.id;
    dispatch(removeQuote(collectionId, quoteId));
}

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <UserNavBar />
      <div className="collection-body_content" id="scrollbar">
        <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <h1>Edit Collection</h1>
          <ul className="errors">
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <form onSubmit={onSubmit} className="form">
            <label htmlFor="collection">Collection</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Edit collection here..." />
            <button onClick={() => setModalIsOpen(false)}>Close</button>
            <button type="submit" disabled={errors.length > 0}>Submit Collection</button>
          </form>
          <h1>Delete Collection</h1>
          <button onClick={onClickDelete}>Delete This Collection</button>
        </Modal>

        <Modal className="modal" isOpen={secondModalIsOpen} onRequestClose={() => setSecondModalIsOpen(false)}>
          <h1>All my quotes in a collection!</h1>
          {collection_quotes_arr.map(quote => (
            <div key={quote.id} className="favorite-body_content-content">
              <span className="favorite-body_content-content_favorite">{quote.content}</span>
              <span className="favorite-body_content-content_option" onClick={() => onClickDeleteColQuote(quote)}><i className="fas fa-minus-circle"></i></span>
              <span className="favorite-body_content-content_author">- {quote.author}</span>
            </div>
          ))}
        </Modal>

        <CreateCollectionBtn />
        <span className="collection-body_content-header">Collections</span>
        {collectionsArr.map(collection => (
          <div key={collection.id} className="collection-body_content-content" onClick={(e) => collectionQuoteModal(e, collection)}>
            <span className="collection-body_content-content_collection">{collection.title}</span>
            <span className="collection-body_content-content_option" onClick={() => onClickOptions(collection)}><i className="fas fa-edit" id="fas_fa_edit"></i></span>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
export default Collection;
