// constants
const GET_QUOTE = "quote/GET_QUOTE";
const ADD_QUOTE = "quote/ADD_QUOTE";

// actions
const getQuote = (data) => ({
    type: GET_QUOTE,
    data
});

const addQuote = (data) => ({
    type: ADD_QUOTE,
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
    console.log('-----------POST NEW QUOTE--------: ', quote);
    dispatch(addQuote(quote))
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

        default:
            return state;
    }
}

export default quoteReducer;
