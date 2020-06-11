import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR } from '../actions/types'
import { AsyncStorage } from 'react-native';

const initialState = {
    token: AsyncStorage.getItem('token'),
    isAuthenticated: null,
    user: null
}

export default async (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case REGISTER_SUCCESS:
            await AsyncStorage.setItem('token', JSON.stringify(action.payload.token))
            return {
                ...state,
                isAuthenticated: true,
                ...action.payload
            };
        case AUTH_ERROR:
        case REGISTER_FAIL:
            await AsyncStorage.removeItem('token')
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