import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {getQuotes, getQuotesByUser, createQuote, deleteQuote, editQuote} from "../store/quote"
import {getCollections, createCollection, editCollection, deleteCollection} from "../store/collection";
import {getCollectionQuotes, createCollectionQuote, removeQuote} from "../store/collection_quote"
import {getFavorites, favoriteQuote, unlikeQuote} from "../store/favorite";

function TestApiRoutes() {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getQuotes())
        // dispatch(getQuotesByUser(1))
        // dispatch(createQuote(
        //     'This is a quote',
        //     'anonymous',
        //     1,
        // ))
        // dispatch(deleteQuote(62))
        // dispatch(editQuote('This is edited quote', 'edited author', 61))
        // dispatch(getCollections(1))
        // dispatch(createCollection('new title', 1))
        // dispatch(editCollection('edited title', 6))
        // dispatch(deleteCollection(6))
        // dispatch(getCollectionQuotes(2))
        // dispatch(createCollectionQuote(2, 25))
        // dispatch(removeQuote(2, 25))
        // dispatch(getFavorites(1));
        // dispatch(favoriteQuote(1,20))
        // dispatch(unlikeQuote(1, 20))
    }, [dispatch])


    return (
        <div>
            <h2>This page is for testing purposes only</h2>

        </div>
    )
}

export default TestApiRoutes;
