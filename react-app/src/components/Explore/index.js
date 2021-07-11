import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserNavBar from './UserNavBar';
import { getQuotes } from '../../store/quote';
import { favoriteQuote, getFavorites } from '../../store/favorite';
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
    const favoritesArr = Object.values(favorites)
    const quotesArr = Object.values(quotes).filter(quote => quote.owner_id === null || quote.owner_id === user.id);

    // console.log('----favorites: ', favoritesArr);
    // console.log('quotes arr: ', quotesArr);

    const filteredArr = []

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

    // console.log('----filtered arr: ', filteredArr);



    // const [userQuotes, setUserQuotes] = useState(quotesArr)
    // const [lastDirection, setLastDirection] = useState()

    // const quoteRefs = useMemo(() => Array(quotesArr.length).fill(0).map(i => React.createRef()), [])
    // const alreadyRemoved = [];
    // let quotesState = quotesArr;

    // const swiped = (direction, nameToDelete) => {
    //     console.log('removing: ' + nameToDelete)
    //     setLastDirection(direction)
    //     alreadyRemoved.push(nameToDelete)
    // }

    // const outOfFrame = (author) => {
    //     console.log(author + ' left the screen!')
    //     quotesState = quotesState.filter(quote => quote.author !== author)
    //     setUserQuotes(quotesState)
    // }

    // const swipe = (dir) => {
    //     const cardsLeft = quotesArr.filter(quote => !alreadyRemoved.includes(quote.author))
    //     if (cardsLeft.length) {
    //         console.log('to be removed: ', cardsLeft[0].author)
    //         const toBeRemoved = cardsLeft[0].author // Find the card object to be removed
    //         console.log('index: ', quotesArr.map(quote => quote.author).indexOf(toBeRemoved))
    //         const index = quotesArr.map(quote => quote.author).indexOf(toBeRemoved) // Find the index of which to make the reference to
    //         console.log('pushed: ', alreadyRemoved.push(toBeRemoved))
    //         alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
    //         console.log('quote ref: ', quoteRefs[index])
    //         // quoteRefs[index].current.swipe(dir) // Swipe the card!
    //     }
    // }


    useEffect(() => {
        dispatch(getQuotes())
        dispatch(getFavorites(user.id))
    }, [dispatch])

    const onSwipe = (direction, quote) => {
        // console.log('You swiped: ' + direction)
        // console.log('quote: ' + quote.id)
        setQuoteId(quote.id)

        //check if the user swiped right like, if left then reject
        if (direction === "right") {
            dispatch(favoriteQuote(user.id, quote.id))
            const div = document.querySelector('.heart');
            div.style.opacity = 1;
            setTimeout(() => {
                div.style.opacity = 0;
            }, 400)
        }
    }

    const onCardLeftScreen = (myIdentifier) => {
        // console.log(myIdentifier + ' left the screen')
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setModalIsOpen(false)
    }

    const onClickOpenModal = () => {
        setModalIsOpen(true);
        //inside the modal...
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
                <h1>Edit Quote</h1>
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

            <div onClick={() => console.log('hit')} className="bookmark_container">
                <i className="far fa-bookmark"></i>
            </div>

            {/* <div className='buttons'>
                <button onClick={() => swipe('left')}>Swipe left!</button>
                <button onClick={() => swipe('right')}>Swipe right!</button>
            </div> */}
            <div className="heart"><i className="fas fa-heart"></i></div>
            <Footer />
        </div>
    );
}

export default Explore;
