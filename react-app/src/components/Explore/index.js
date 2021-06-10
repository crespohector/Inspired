import React, { useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserNavBar from './UserNavBar';
import { getQuotes } from '../../store/quote';
import Footer from '../SplashPage/Footer';

import TinderCard from 'react-tinder-card'
import "./Explore.css";

const Explore = () => {
    // const [quote, setQuote] = useState();
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const quotes = useSelector(state => state.quote)

    const quotesArr = Object.values(quotes).filter(quote => quote.owner_id === null);
    // console.log('quotes: ', quotesArr);
    const quote = quotesArr[count];
    console.log('------quote------: ', quote)

    //use effect to listen when the like button or the dislike is clicked then switch a quote
    useEffect(() => {
        dispatch(getQuotes())
    }, [dispatch])

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
        console.log('---count----: ', count)
        setCount(count + 1)
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    if (!user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="user_main_container">
            <UserNavBar />
            <div className="quote_container">
                {/* {quotesArr.map(quote => (
                    <div key={quote.id} className="swipe">{quote.content}</div>
                ))} */}
                <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']}>
                        Content goes here
                </TinderCard>
            </div>
            <Footer />
        </div>
    );
}

export default Explore;
