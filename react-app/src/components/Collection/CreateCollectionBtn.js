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

    const onSubmit = (e) => {
        e.preventDefault();
        setTitle('');
        dispatch(createCollection(title, userId));
        setModalIsOpen(false)
    }

    return (
        <>
            <button className="post_quote_btn" onClick={() => setModalIsOpen(true)}>Create collection</button>
            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <form onSubmit={onSubmit} className="was-validated form">
                    <label htmlFor="collection" className='form-label'><strong>Collection</strong></label>
                    <input type='text' id="collection" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title here..." required maxLength={40} />
                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                    <button type="submit" >Submit collection</button>
                </form>
            </Modal>
        </>
    )
}

export default CreateCollectionBtn;
