import React from 'react';
import { View, StatusBar, } from 'react-native';
import { Provider } from 'react-redux'
import store from './states/store'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import SignUp from './screens/signUp';
import LogIn from './screens/logIn';

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
      <View>
        <StatusBar backgroundColor="#2F0000" />
        <SignUp />
        {/* <LogIn/> */}
      </View>
    </Provider>
    // </PaperProvider>
  );
};


export default App;
