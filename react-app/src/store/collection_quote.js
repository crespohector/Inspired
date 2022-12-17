// constants
const GET_COLLECTION_QUOTES = "collection_quote/GET_COLLECTION_QUOTES";
const ADD_COLLECTION_QUOTE = "collection_quote/ADD_COLLECTION_QUOTE";
const ROMOVE_COLLECTION_QUOTE = "collection_quote/ROMOVE_COLLECTION_QUOTE";

// actions
const getCollectionQuote = (data) => ({
    type: GET_COLLECTION_QUOTES,
    data
})

const addCollectionQuote = (data) => ({
    type: ADD_COLLECTION_QUOTE,
    data
})

const removeCollectionQuote = (data) => ({
    type: ROMOVE_COLLECTION_QUOTE,
    data
})


// thunk actions

//GET: get all quotes from a collection
export const getCollectionQuotes = (collectionId) => async (dispatch) => {
    const response = await fetch(`/api/collections/${collectionId}/quotes/`)
    const quotes = await response.json()
    dispatch(getCollectionQuote(quotes))
    return ;
}

//POST: add a quote to a collection
export const createCollectionQuote = (collectionId, quoteId) => async (dispatch) => {
    const response = await fetch(`/api/collections/${collectionId}/quotes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({quoteId})
    });
    const quote = await response.json();
    dispatch(addCollectionQuote(quote));
    return ;
}

//DELETE: remove a quote from a collection
export const removeQuote = (collectionId, quoteId) => async (dispatch) => {
    const response = await fetch(`/api/collections/${collectionId}/quotes/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({quoteId})
    });
    const quote = await response.json()
    dispatch(removeCollectionQuote(quote));
    return ;
}


const collectionQuoteReducer = (state={}, action) => {
    let newState;
    switch (action.type) {
        case GET_COLLECTION_QUOTES:
            newState = {}
            action.data['collection_quote'].forEach(quote => {
                newState[quote.id] = quote
            });
            return newState;

        case ADD_COLLECTION_QUOTE:
            newState = {...state}
            newState[action.data.id] = action.data
            return newState;

        case ROMOVE_COLLECTION_QUOTE:
            newState = {...state}
            delete newState[action.data.id];
            return newState;

        default:
            return state
    }
}

export default collectionQuoteReducer;
