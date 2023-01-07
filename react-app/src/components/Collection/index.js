import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Modal from "react-modal";
import { getCollections, editCollection, deleteCollection } from '../../store/collection';
import { getCollectionQuotes, removeQuote } from '../../store/collection_quote';
import Footer from '../SplashPage/Footer';
import CreateCollectionBtn from './CreateCollectionBtn';

import "./collection.css";

function Collection() {
  const [title, setTitle] = useState('');
  const [collectionId, setCollectionId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);

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
    dispatch(getCollections(user.id))
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

  return (
    <div>
      <div className="collection-body_content" id="scrollbar">
        <Modal className="modal collections" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <form onSubmit={onSubmit} className="was-validated form">
            <label htmlFor="collection" className='form-label'><strong>Title*</strong></label>
            <input className='form-control' type='text' id="collection" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title here..." required maxLength={100} />
            <button className="btn btn-outline-secondary" id="cancel_btn" onClick={() => setModalIsOpen(false)}>Close</button>
            <button className='btn btn-outline-dark' id="cancel_btn" type="submit" >Edit collection</button>
          </form>
          <button className="btn btn-outline-danger" onClick={onClickDelete}>Delete this collection</button>
        </Modal>

        <Modal className="modal quotes_collections" isOpen={secondModalIsOpen} onRequestClose={() => setSecondModalIsOpen(false)}>
          <h2>All my quotes in a collection!</h2>
          {collection_quotes_arr.reverse().map(quote => (
            <div key={quote.id} className="favorite-body_content-content">
              <div className="favorite-body_content-content_favorite">{quote.content}</div>
              <div className="favorite-body_content-content_option" onClick={() => onClickDeleteColQuote(quote)}><i className="fas fa-minus-circle"></i></div>
              <div className="favorite-body_content-content_author">- {quote.author}</div>
            </div>
          ))}
        </Modal>

        <CreateCollectionBtn />
        <span className="collection-body_content-header">Collections</span>
        {collectionsArr.reverse().map(collection => (
          <div key={collection.id} className="collection-body_content-content" onClick={(e) => collectionQuoteModal(e, collection)}>
            <div className="collection-body_content-content_collection">{collection.title}</div>
            <div className="collection-body_content-content_option" onClick={() => onClickOptions(collection)}><i className="fas fa-edit" id="fas_fa_edit"></i></div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
export default Collection;
