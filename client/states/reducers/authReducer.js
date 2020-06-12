import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT } from '../actions/types'
import { AsyncStorage } from 'react-native';

const initialState = {
    token: null,
    isAuthenticated: null,
    user: null
}

// (async function defineInitialState(){
//     initialState = {
//         token: await AsyncStorage.getItem('token'),
//         isAuthenticated: null,
//         user: null
//     }
// })()

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            AsyncStorage.setItem('token', action.payload.token)
            return {
                ...state,
                isAuthenticated: true,
                ...action.payload
            };
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOG_OUT:
            AsyncStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null
            };
        default:
            return state
    }
}