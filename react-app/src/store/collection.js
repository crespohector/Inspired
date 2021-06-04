// constants
const GET_COLLECTION = "collection/GET_COLLECTION";


// actions
const getCollection = (data) => ({
    type: GET_COLLECTION,
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



const collectionReducer = (state={}, action) => {
    let newState;
    switch (action.type) {
        case GET_COLLECTION:
            newState = {...state}
            action.data['collections'].forEach(collection => {
                newState[collection.id] = collection
            });
            return newState;

        default:
            return state
    }
}

export default collectionReducer;
