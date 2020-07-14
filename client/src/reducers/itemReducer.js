import { v1 as uuid } from 'uuid'
import { ADD_ITEM, DELETE_ITEM, GET_ITEMS } from '../actions/types'

const initialState = {
    items: [
        {id:uuid(), name:'Eggs'},
        {id:uuid(), name:'Bread'},
        {id:uuid(), name:'Milk'},
        {id:uuid(), name:'Chocolate'}
        
    ]
}

export default function(state=initialState.items, action){
    switch(action.type){
        case GET_ITEMS: {
            return [...state]
        }
        case ADD_ITEM: {
            return [...state, action.payload]
        }
        case DELETE_ITEM: {
            return state.filter(item => item.id !== action.payload)
        }
        default: {
            return [...state]
        }
    }
}