import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import { createQuote } from '../../store/quote';


Modal.setAppElement('#root');

function CreateQuoteBtn() {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const user = useSelector(state => state.session.user);


    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createQuote(content, author, user.id));
        setContent('');
        setAuthor('');
        setModalIsOpen(false)
    }

    return (
        <>
            <button className="create_btn" onClick={() => setModalIsOpen(true)}>Create Quote</button>
            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <form onSubmit={onSubmit} className="was-validated form">
                    <label htmlFor="quote-input" className="form-label"><strong>Quote*</strong></label>
                    <textarea id="quote-input" className="form-control" value={content} onChange={e => setContent(e.target.value)} placeholder="Enter quote here..."  required rows={3} maxLength={255}></textarea>
                    <label htmlFor="author-input" className="form-label"><strong>Author</strong></label>
                    <input type='text' id="author-input" className='form-control' value={author} onChange={e => setAuthor(e.target.value)} placeholder="<Optional> Enter author name here..." maxLength={150}/>
                    <button className="btn btn-outline-secondary" id="cancel_btn" onClick={() => setModalIsOpen(false)}>Close</button>
                    <button type="submit" className="btn btn-outline-dark">Create New Quote</button>
                </form>
            </Modal>
        </>
    )
}

export default CreateQuoteBtn;
