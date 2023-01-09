import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import { createCollection } from '../../store/collection';

Modal.setAppElement('#root');

function CreateCollectionBtn() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [title, setTitle] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        setTitle('');
        dispatch(createCollection(title, user.id));
        setModalIsOpen(false)
    }

    return (
        <>
            <button className="create_btn" onClick={() => setModalIsOpen(true)}>Create collection</button>
            <Modal className="modal collections" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <form onSubmit={onSubmit} className="was-validated form">
                    <label htmlFor="collection" className='form-label'><strong>Title*</strong></label>
                    <input className='form-control' type='text' id="collection" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title here..." required maxLength={100} />
                    <button className="btn btn-outline-secondary" id="cancel_btn" onClick={() => setModalIsOpen(false)}>Close</button>
                    <button className='btn btn-outline-dark' type="submit" >Create new collection</button>
                </form>
            </Modal>
        </>
    )
}

export default CreateCollectionBtn;
