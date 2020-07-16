import axios from 'axios'
import { returnErrors } from './errorActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS, 
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'


export const register = (user) => {
    return dispatch => {
        axios.post('/api/users/register', user)
            .then(res => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
                dispatch({
                    type: REGISTER_FAIL
                })
            })
    }
}

export const login = (user) => {
    return dispatch => {
        axios.post('/api/auth', user)
            .then(res => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
                dispatch({
                    type: LOGIN_FAIL
                })
            })
    }
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const loadUser = () => {
    return (dispatch, getState) => {
        // user loading
        dispatch({ type: USER_LOADING })

        

        axios.get('/api/auth/user', tokenConfig(getState))
            .then(res =>{
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({
                    type: AUTH_ERROR
                })
            })
    }
}

export const tokenConfig = (getState) => {
    //Get token from localstorage
    const token = getState().auth.token

    //Headers
    const config = {
        headers : {
            "Content-type": "application/json"
        }
    }

    if(token){
        config.headers['x-auth-token'] = token
    }

    return config
}