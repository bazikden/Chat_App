import axios from 'axios';
import {
    GET_ALL_CHATS,
    SET_CHAT_ERRORS,
    ADD_NEW_CHAT_MESSAGE
} from './types';
import { CHAT_SERVER } from '../components/Config.js';


export const getAllMessages = async () => {
    try {
        const messages = await axios.get(`${CHAT_SERVER}`)
        
        return {
            type: GET_ALL_CHATS,
            payload: messages.data.messages
        }
        
    } catch (error) {
        return{
            type:SET_CHAT_ERRORS,
            payload: 'Failed to get Messages'
        }
    }
}
export const afterPostMessage = (message) => {
    return {
        type:ADD_NEW_CHAT_MESSAGE,
        payload:message
    }
}



