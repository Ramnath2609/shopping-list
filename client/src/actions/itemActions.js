import { ADD_ITEM, DELETE_ITEM, GET_ITEMS, ITEMS_LOADING } from '../actions/types'
import axios from 'axios'
import { tokenConfig } from './authActions'

export const getItems =() => {
    return dispatch => {
        dispatch(setItemsLoading())
        axios.get('/api/items')
            .then(response => {
                const items = response.data
                dispatch({
                    type: GET_ITEMS,
                    payload: items
                })
            })
    }
}

export const addItem = (item) => {
    return (dispatch, getState) => {
        axios.post('/api/items', item, tokenConfig(getState))
            .then(response=>{
                const item = response.data
                dispatch({
                    type: ADD_ITEM,
                    payload: item
                })
            })
    }
}

export const deleteItem = (id) => {
    return (dispatch, getState) => {
        axios.delete(`/api/items/${id}`,tokenConfig(getState))
            .then(response=>{
                if(response.data.sucess){
                    dispatch({
                        type: DELETE_ITEM,
                        payload: id
                    })
                }               
            })
    }
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}