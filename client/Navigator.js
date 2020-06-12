import 'react-native-gesture-handler';
import React, { useState, Fragment, useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Provider, connect } from 'react-redux'
import store from './states/store'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import setAuthToken from './states/setAuthToken'
import SignUp from './screens/signUp';
import LogIn from './screens/logIn';
import Loading from './screens/loading'
import Home from './screens/home'

export const Navigator = ({ auth: { isAuthenticated } }) => {
    const [loading, setLoading] = useState(true)

    const callTokenStorage = async () => {
        // await AsyncStorage.removeItem('token')
        var token = await AsyncStorage.getItem('token')
        if (token) { setAuthToken(token) }
        setLoading(false)
    }

    useEffect(() => {
        callTokenStorage()
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' screenOptions={{ cardStyle: { backgroundColor: 'white' } }}>
                {loading ? <Stack.Screen name="Loading" component={Loading} /> :
                    isAuthenticated ? <Stack.Screen name="Home" component={Home} />
                        :
                        <Fragment>
                            <Stack.Screen name="LogIn" component={LogIn} />
                            <Stack.Screen name="SignUp" component={SignUp} />
                        </Fragment>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Navigator)