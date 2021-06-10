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
    const [errors, setErrors] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        setContent('');
        setAuthor('');
        dispatch(createQuote(content, author, userId));
        setModalIsOpen(false)
    }

    useEffect(() => {
        const errors = [];
        if (content.length < 15) {
            errors.push("Content field must be greater than 15 characters");
        }
        setErrors(errors);
    }, [content])


    return (
        <>
            <button className="post_quote_btn" onClick={() => setModalIsOpen(true)}>Create Quote</button>
            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h1>Add Your Own Quote!</h1>
                <ul className="content_errors">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <form onSubmit={onSubmit}>
                    <label htmlFor="content">Content</label>
                    <input value={content} onChange={e => setContent(e.target.value)} placeholder="Enter quote here..." required />
                    <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Enter author here..." />
                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                    <button type="submit" disabled={errors.length > 0}>Submit quote</button>
                </form>
            </Modal>
        </>
    )
}

export default CreateQuoteBtn;
