import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
// import {Logo} from '../Icons/instatake-white.png'

export const loadingScreen = () => {
    return (
        <View style={styles.loadingIndicator}>
            <ActivityIndicator size='large' color='#2F0000' />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingIndicator: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default loadingScreen;
