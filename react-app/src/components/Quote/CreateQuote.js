import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { createQuote } from '../../store/quote';


Modal.setAppElement('#root');

function CreateQuoteBtn() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        setContent('');
        setAuthor('');
        dispatch(createQuote(content, author, userId));
        setModalIsOpen(false)
    }

    return (
        <>
            <button className="post_quote_btn" onClick={() => setModalIsOpen(true)}>Create Quote</button>
            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <form onSubmit={onSubmit} className="was-validated form">
                    <label htmlFor="quote-input" className="form-label"><strong>Quote*</strong></label>
                    <textarea id="quote-input" className="form-control" value={content} onChange={e => setContent(e.target.value)} placeholder="Enter quote here..."  required rows={3} maxLength={255}></textarea>
                    <label htmlFor="author-input" className="form-label"><strong>Author</strong></label>
                    <input type='text' id="author-input" className='form-control' value={author} onChange={e => setAuthor(e.target.value)} placeholder="<Optional> Enter author name here..." maxLength={150}/>
                    <button  className="btn btn-outline-secondary" id='quote-button' onClick={() => setModalIsOpen(false)}>Close</button>
                    <button type="submit" className="btn btn-outline-dark">Create New Quote</button>
                </form>
            </Modal>
        </>
    )
}

export default CreateQuoteBtn;
