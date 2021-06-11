import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { getCollectionQuotes, removeQuote } from '../../store/collection_quote';

Modal.setAppElement('#root');

function CollectionQuote() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [quoteId, setQuoteId] = useState(null);
    const [collectionId, setCollectionId] = useState(null);

    const quotes = useSelector(state => state.collection_quote);
    console.log('----collection quotes: ', quotes);

    useEffect(() => {
        dispatch(getCollectionQuotes(collectionId));
    }, [dispatch])

    const onClickDelete = () => {
        dispatch(removeQuote(collectionId, quoteId));
    }

    return (
        <>
            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h1>All my quotes in a collection!</h1>
            </Modal>
        </>
    )
}

export default CollectionQuote;
