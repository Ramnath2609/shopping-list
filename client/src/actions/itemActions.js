import { ADD_ITEM, DELETE_ITEM, GET_ITEMS } from '../actions/types'


export const getItems =() => {
    return {
        type: GET_ITEMS
    }
}

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: item
    }
}

export const deleteItem = (item) => {
    return {
        type: DELETE_ITEM,
        payload: item
    }
}