import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAILURE,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
} from '../constants/actionTypes';
import axios from 'axios';
import { API_URL } from '../constants/config';
import { history } from '../';

export function registerUser(credentials){
    return async dispatch => {
        await dispatch(requestRegistration(credentials))

        await axios
            .post(API_URL+'/register', credentials)
            .then(async res => {
                if(res.status===200 || res.status===201){
                    await dispatch(receiveRegistration(res.data));
                    await dispatch(loginUser({username: credentials.username, password: credentials.password}));
                }else{
                    await dispatch(errorRegistration(res.data.error));
                    return await Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
    }


    function requestRegistration(credentials){
        return {
            type: USER_REGISTRATION_REQUEST,
            payload: credentials
        }
    }

    function receiveRegistration(user){
        return {
            type: USER_REGISTRATION_SUCCESS,
            payload: user.user_token
        }
    }

    function errorRegistration(err){
        return {
            type: USER_REGISTRATION_FAILURE,
            payload: err
        }
    }
}

export function loginUser(credentials){
    return async dispatch => {
        await dispatch(requestLogin(credentials));
        
        await axios
            .post(API_URL+'/login', credentials)
            .then(async res => {
                if(res.status===200){
                    await dispatch(receiveLogin(res.data));
                    await history.push('/');
                }else{
                    await dispatch(errorLogin(res.data.error));
                    return await Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
        
    }


    function requestLogin(credentials){
        return {
            type: USER_LOGIN_REQUEST,
            payload: credentials
        }
    }

    function receiveLogin(user){
        return {
            type: USER_LOGIN_SUCCESS,
            payload: user
        }
    }

    function errorLogin(err){
        return {
            type: USER_LOGIN_FAILURE,
            payload: err
        }
    }
}

export function logoutUser(){
    return async dispatch => {
        await dispatch(requestLogout())

        try {
            await dispatch(receiveLogout());
            await history.push('/');
        }
        catch(err){
            await dispatch(errorLogout({err: "ERR during logout"}));
        }
    }


    function requestLogout(){
        return {
            type: USER_LOGOUT_REQUEST
        }
    }

    function receiveLogout(){
        return {
            type: USER_LOGOUT_SUCCESS
        }
    }

    function errorLogout(err){
        return {
            type: USER_LOGOUT_FAILURE,
            payload: err
        }
    }
}