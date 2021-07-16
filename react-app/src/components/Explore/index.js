import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserNavBar from './UserNavBar';
import { getQuotes } from '../../store/quote';
import { favoriteQuote, getFavorites } from '../../store/favorite';
import { getCollections } from '../../store/collection';
import { createCollectionQuote } from '../../store/collection_quote';
import Footer from '../SplashPage/Footer';

import Modal from "react-modal";
import TinderCard from 'react-tinder-card'
import "./Explore.css";

const Explore = () => {
    const [quoteId, setQuoteId] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const quotes = useSelector(state => state.quote);
    const favorites = useSelector(state => state.favorite);
    const collections = useSelector(state => state.collection)
    const collectionsArr = Object.values(collections);
    const favoritesArr = Object.values(favorites)
    const quotesArr = Object.values(quotes).filter(quote => quote.owner_id === null || quote.owner_id === user?.id);

    const filteredArr = []
    let count = 0;

    useEffect(() => {
        dispatch(getQuotes())
        dispatch(getFavorites(user?.id))
    }, [dispatch])

    if (favoritesArr.length) {
        for (let i = 0; i < quotesArr.length; i++) {
            let bool = true;
            for (let j = 0; j < favoritesArr.length; j++) {
                if (quotesArr[i].id === favoritesArr[j].id) {
                    bool = false;
                    break;
                }
            }
            if (bool) {
                filteredArr.push(quotesArr[i]);
            }
        }
    }
    console.log('----filtered arr: ', filteredArr);

    const onSwipe = (direction, quote) => {

        count += 1
        // console.log('----------on swipe array: ', filteredArr[count].id);
        setQuoteId(filteredArr[count].id)

        //check if the user swiped right like, if left then reject
        if (direction === "right") {
            dispatch(favoriteQuote(user.id, quote.id))
            const div = document.querySelector('.heart');
            div.style.display = "inline-block";
            div.style.opacity = 1;
            setTimeout(() => {
                div.style.opacity = 0;
            }, 200)
            setTimeout(() => {
                div.style.display = "none";
            }, 400)
        }
    }

    const onCardLeftScreen = (myIdentifier) => {
        // console.log(myIdentifier + ' left the screen')
    }

    const addQuoteToCollection = (collection) => {
        setModalIsOpen(false)
        // console.log('------ids: ', collection.id, quoteId)
        dispatch(createCollectionQuote(collection.id, quoteId))
    }

    const onClickOpenModal = () => {
        setModalIsOpen(true);
        dispatch(getCollections(user.id))

        if (quoteId === 0) {
            setQuoteId(filteredArr[0].id)
        }

        console.log('on click button ', filteredArr)

        //1.) we want to dispatch a list of all the collections from the user
        //2.) render all the collection similarly to the quotes css style
        //3.) render a checkbox to each collection
        //4.) create a submit btn
        //5.) dispatch the collection_quote post action
    }

    if (!user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="user_main_container">
            <UserNavBar />

            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h1>Save this quote to a collection!</h1>
                {collectionsArr.map(collection => (
                    <div key={collection.id} className="favorite-body_content-content">
                        <span className="favorite-body_content-content_favorite">{collection.title}</span>
                        <span className="favorite-body_content-content_option" onClick={() => addQuoteToCollection(collection)}><i className="fas fa-plus-circle"></i></span>
                    </div>
                ))}
            </Modal>

            <div className="swipe_text_container"><span>Swipe left or right!</span></div>
            {filteredArr.length !== 0 ?
                <div className="card_container">
                    {filteredArr.map((quote) => (
                        <TinderCard className="tinder_card" key={quote.id} onSwipe={(e) => onSwipe(e, quote)} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']}>
                            <div className="tinder_card_quote">{quote.content}</div>
                            <div className="tinder_card_author">~ {quote.author}</div>
                        </TinderCard>
                    ))}

                </div> :
                <div className="no_cards_container">
                    <span>Currently no more quotes...</span>
                    <span>Create your own quote!</span>
                </div>}

            {/* <div onClick={() => console.log('hit')} className="bookmark_container">
                <i className="far fa-bookmark"></i>
            </div> */}
            <button onClick={onClickOpenModal} type="button" className="bookmark_btn"><i className="far fa-bookmark"></i></button>

            <div className="heart"><i className="fas fa-heart"></i></div>
            <Footer />
        </div>
    );
}

export default Explore;
