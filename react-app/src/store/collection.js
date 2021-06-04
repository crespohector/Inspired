// constants
const GET_COLLECTION = "collection/GET_COLLECTION";
const ADD_COLLECTION = "collection/ADD_COLLECTION";
const REMOVE_COLLECTION = "collection/REMOVE_COLLECTION";

// actions
const getCollection = (data) => ({
    type: GET_COLLECTION,
    data
})

const addCollection = (data) => ({
    type: ADD_COLLECTION,
    data
})

const removeCollection = (data) => ({
    type: REMOVE_COLLECTION,
    data
})

// thunk actions

//GET: get all collections from a user
export const getCollections = (userId) => async (dispatch) => {
    const response = await fetch(`/api/collections/user/${userId}/`)
    const collection = await response.json()
    // console.log('---------collections-------: ', collection)
    dispatch(getCollection(collection))
    return ;
}

//POST: create a new collection with the title and user id
export const createCollection = (title, userId) => async (dispatch) => {
    const response = await fetch(`/api/collections/user/${userId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title})
    });
    const collection = await response.json();
    // console.log('-------collection-----: ', collection);
    dispatch(addCollection(collection));
    return ;
}

//PUT: edit a collection with the primary id
export const editCollection = (title, id) => async (dispatch) => {
    const response = await fetch(`/api/collections/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title})
    });
    const collection = await response.json();
    // console.log('-----edit collection------', collection);
    dispatch(addCollection(collection));
    return ;
}

//DELETE: delete a collection with the primary id
export const deleteCollection = (id) => async (dispatch) => {
    const response = await fetch(`/api/collections/${id}/`, {
        method: 'DELETE',
    });
    const collection = await response.json();
    // console.log('----deleted collection-------: ', collection);
    dispatch(removeCollection(collection));
    return ;
}


const collectionReducer = (state={}, action) => {
    let newState;
    switch (action.type) {
        case GET_COLLECTION:
            newState = {...state}
            action.data['collections'].forEach(collection => {
                newState[collection.id] = collection
            });
            return newState;

        case ADD_COLLECTION:
            newState = {...state}
            newState[action.data.id] = action.data
            return newState

        case REMOVE_COLLECTION:
            newState = {...state}
            delete newState[action.data.id];
            return newState;

        default:
            return state
    }
}

export default collectionReducer;
