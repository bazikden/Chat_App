import {
    GET_ALL_CHATS, SET_CHAT_ERRORS, ADD_NEW_CHAT_MESSAGE,
} from '../_actions/types';

const initialState = {
    messages:[],
    errors:[],
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_ALL_CHATS:
            return {...state, messages: action.payload }

        case SET_CHAT_ERRORS:
            return {...state, errors: [...state.errors,action.payload]}

        case ADD_NEW_CHAT_MESSAGE:
            return {...state,messages:[...state.messages,action.payload]}

        default:
            return state;
    }
}