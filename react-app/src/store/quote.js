// constants
const GET_QUOTE = "quote/GET_QUOTE";
const ADD_QUOTE = "quote/ADD_QUOTE";
const REMOVE_QUOTE = "quote/REMOVE_QUOTE";

// actions
const getQuote = (data) => ({
    type: GET_QUOTE,
    data
});

const addQuote = (data) => ({
    type: ADD_QUOTE,
    data
})

const removeQuote = (data) => ({
    type: REMOVE_QUOTE,
    data
})

// thunk actions

//GET: get all the quotes
export const getQuotes = () => async (dispatch) => {
    const response = await fetch('/api/quotes/')
    const quotes = await response.json()
    // console.log("-------quotes------: ", quotes)
    dispatch(getQuote(quotes))
    return ;
  }

//GET: get all the quotes based on user id
export const getQuotesByUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/quotes/user/${userId}/`)
    const quotes = await response.json();
    // console.log("----------user quotes-------: ", quotes);
    dispatch(getQuote(quotes));
    return ;
}

//POST: create a quote with the content, author, and user id
export const createQuote = (content, author, userId) => async (dispatch) => {
    const response = await fetch(`/api/quotes/user/${userId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            author
        })
    });
    const quote = await response.json();
    // console.log('-----------POST NEW QUOTE--------: ', quote);
    dispatch(addQuote(quote))
    return ;
}

//PUT: Edit a quote with the content, author, and quote id
export const editQuote = (content, author, id) => async (dispatch) => {
    const response = await fetch(`/api/quotes/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            author
        })
    });
    const quote = await response.json();
    // console.log('----------edit quote----------', quote)
    dispatch(addQuote(quote))
    return ;
}

//DELETE: delete a quote based on quote id
export const deleteQuote = (id) => async (dispatch) => {
    const response = await fetch(`/api/quotes/${id}/`, {
        method: 'DELETE',
    });
    const quote = await response.json();
    // console.log('----------DELETED QUOTE----------: ', quote)
    dispatch(removeQuote(quote))
    return ;
}


const quoteReducer = (state={}, action) => {
    let newState;
    switch (action.type){
        case GET_QUOTE:
            newState = {...state}
            action.data['quotes'].forEach(quote => {
                newState[quote.id] = quote
            });
            return newState;

        case ADD_QUOTE:
            newState = {...state}
            newState[action.data['id']] = action.data
            return newState;

        case REMOVE_QUOTE:
            newState = {...state};
            delete newState[action.data.id];
            return newState;

        default:
            return state;
    }
}

export default quoteReducer;
