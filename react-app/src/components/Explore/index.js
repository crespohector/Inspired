import React, { useEffect, useState, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserNavBar from './UserNavBar';
import { getQuotes } from '../../store/quote';
import { favoriteQuote } from '../../store/favorite';
import Footer from '../SplashPage/Footer';

import TinderCard from 'react-tinder-card'
import "./Explore.css";

const Explore = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const quotes = useSelector(state => state.quote);
    const quotesArr = Object.values(quotes).filter(quote => quote.owner_id === null);

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
    }, [dispatch])

    const onSwipe = (direction, quote) => {
        // console.log('You swiped: ' + direction)
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

    if (!user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="user_main_container">
            <UserNavBar />
            <div className="swipe_text_container"><span>Swipe left or right!</span></div>
            <div className="card_container">
                {quotesArr.map((quote) => (
                    <TinderCard className="tinder_card" key={quote.id} onSwipe={(e) => onSwipe(e, quote)} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']}>
                        <div className="tinder_card_quote">{quote.content}</div>
                        <div className="tinder_card_author">~ {quote.author}</div>
                    </TinderCard>
                ))}
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
