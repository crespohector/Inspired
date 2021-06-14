import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { createCollection } from '../../store/collection';


Modal.setAppElement('#root');

function CreateCollectionBtn() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        setTitle('');
        dispatch(createCollection(title, userId));
        setModalIsOpen(false)
    }

    useEffect(() => {
        const errors = [];
        if (title.length < 15) {
            errors.push("Title field must be greater than 15 characters");
        }
        setErrors(errors);
    }, [title])


    return (
        <>
            <button className="post_quote_btn" onClick={() => setModalIsOpen(true)}>Create collection</button>
            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h1>Add Your Own Collection!</h1>
                <ul className="errors">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <form onSubmit={onSubmit} className="form">
                    <label htmlFor="collection">Collection</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title here..." required />
                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                    <button type="submit" disabled={errors.length > 0}>Submit collection</button>
                </form>
            </Modal>
        </>
    )
}

export default CreateCollectionBtn;
