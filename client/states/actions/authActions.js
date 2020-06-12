import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOG_OUT } from './types'
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import setAuthToken from '../setAuthToken'

// Load User
export const loadUser = async dispatch => {
    //load token into global headers
    var token = await AsyncStorage.getItem('token')
    // token = token.slice(1, -1)
    if (token) {
        setAuthToken(token)
    }
    try {
        const res = await axios.get('http://192.168.43.123:5000/api/auth/')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
        dispatch({ type: AUTH_ERROR })
    }
}


// Register User
export const registerUser = formData => async dispatch => {
    const config = { headers: { "Content-Type": "application/json" } }
    try {
        const res = await axios.post('http://192.168.43.123:5000/api/signup/', formData, config)
        await console.log(res.data)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        loadUser(dispatch);
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.msg
        })
    }
}

// Login User
export const loginUser = formData => async dispatch => {
    const config = {headers: {'Content-Type': 'application/json'}}

    try {
        const res = await axios.post('http://192.168.43.123:5000/api/auth/', formData, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data // routes/auth res.json{{token}}
        })
        loadUser(dispatch);
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        })
    }
}

// LOG OUT

export const logOutUser = () => dispatch => { 
    dispatch({
        type: LOG_OUT, // routes/auth res.json{{token}}
    })
}