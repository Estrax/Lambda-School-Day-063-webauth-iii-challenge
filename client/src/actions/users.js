import {
    USERS_FETCH_REQUEST,
    USERS_FETCH_SUCCESS,
    USERS_FETCH_FAILURE
} from '../constants/actionTypes';

import axios from 'axios';
import { API_URL } from '../constants/config';

export function fetchUsers(){
    return async dispatch => {
        await dispatch(requestFetch())
        await axios
            .get(API_URL+`/users/`, {headers: {authorization: localStorage.getItem('jwt')}})
            .then(async res => {
                if(res.status===200){
                    await dispatch(receiveFetch(res.data));
                }else{
                    await dispatch(errorFetch(res.data.error));
                    return Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
    }


    function requestFetch(){
        return {
            type: USERS_FETCH_REQUEST,
        }
    }

    function receiveFetch(users){
        return {
            type: USERS_FETCH_SUCCESS,
            payload: users
        }
    }

    function errorFetch(err){
        return {
            type: USERS_FETCH_FAILURE,
            payload: err
        }
    }
}