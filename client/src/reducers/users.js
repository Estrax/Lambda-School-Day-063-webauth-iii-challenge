import {
    ERROR,
    USERS_FETCH_REQUEST,
    USERS_FETCH_SUCCESS,
    USERS_FETCH_FAILURE
} from '../constants/actionTypes';

const initialState = {
    users: [],
    isFetching: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case USERS_FETCH_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        
        case USERS_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: action.payload
            }
        
        case USERS_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }

        case ERROR:
            return {
                ...state,
                err: action.payload
            }

        default:
            return state;
    }
}
