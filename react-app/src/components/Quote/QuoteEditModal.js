import React, { useState } from 'react';
// import {useDispatch } from 'react-redux';
// import Modal from "react-modal";
// import {deleteOneAnswer} from '../../store/answers';

import "./QuoteEditModal.css"

Modal.setAppElement('#root');

function DeleteQuoteModalBtn({answer}) {
    // const dispatch = useDispatch();
    // const [modalIsOpen, setModalIsOpen] = useState(false);

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     const answerId = answer.id;
    //     const answerObj = {answerId, userId};
    //     dispatch(deleteOneAnswer(answerObj));
    //     setModalIsOpen(false);
    // }

    return (
        <>
            {/* <button onClick={() => setModalIsOpen(true)}>Delete Answer</button>
            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h1>Delete Answer?</h1>
                <form onSubmit={onSubmit}>
                    <button onClick={() => setModalIsOpen(false)}>close</button>
                    <button type="submit">Delete</button>
                </form>
            </Modal> */}
        </>
    )
}

export default DeleteQuoteModalBtn;
