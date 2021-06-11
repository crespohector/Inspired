// constants
const GET_FAVORITE = "favorite/GET_FAVORITE";
const CREATE_FAVORITE = "favorite/CREATE_FAVORITE";
const REMOVE_FAVORITE = "favorite/REMOVE_FAVORITE";

// actions
const getFavorite = (data) => ({
    type: GET_FAVORITE,
    data
})

const createFavorite = (data) => ({
    type: CREATE_FAVORITE,
    data
})

const removeFavorite = (data) => ({
    type: REMOVE_FAVORITE,
    data
})


// thunk actions

//GET: get all favorites from a user
export const getFavorites = (userId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/user/${userId}/`)
    const favorites = await response.json()
    console.log('---------favorites-------: ', favorites)
    dispatch(getFavorite(favorites))
    return;
}

//POST: user can like a new quote
export const favoriteQuote = (userId, quoteId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/user/${userId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quoteId })
    });
    const quote = await response.json()
    console.log('--------new favorite quote-----:', quote);
    dispatch(createFavorite(quote))
    return;
}

//DELETE: user can unlike a quote
export const unlikeQuote = (userId, quoteId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/user/${userId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quoteId })
    });
    const quote = await response.json()
    console.log('--------removed favorite quote-----:', quote);
    dispatch(removeFavorite(quote))
    return;
}


const favoriteReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_FAVORITE:
            newState = { ...state }
            action.data['user_quote'].forEach(favorite => {
                newState[favorite.id] = favorite
            });
            return newState;

        case CREATE_FAVORITE:
            newState = { ...state }
            newState[action.data.id] = action.data
            return newState;

        case REMOVE_FAVORITE:
            newState = { ...state }
            delete newState[action.data.id];
            return newState;

        default:
            return state
    }
}

export default favoriteReducer;
