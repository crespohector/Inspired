import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {getQuotes, getQuotesByUser, createQuote} from "../store/quote"

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
    }, [dispatch])


    return (
        <div>
            <h2>This page is for testing purposes only</h2>

        </div>
    )
}

export default TestApiRoutes;
