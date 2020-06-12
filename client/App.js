import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import store from './states/store'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Navigator from './Navigator'

// const theme = {
//   ...DefaultTheme,
//   roundness: 2,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#3498db',
//     accent: '#f1c40f',
//   },
// };

const App = () => {
  return (
    // <PaperProvider>
    <Provider store={store}>
      <StatusBar backgroundColor="#2F0000" />
      <Navigator />
    </Provider>
    // </PaperProvider>
  );
};

export default (App);
