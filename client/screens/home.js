import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {Button} from 'react-native-paper'
import {connect} from 'react-redux'
import {logOutUser} from '../states/actions/authActions'

export const home = ({logOutUser}) => {
    return (
        <View style={styles.loadingIndicator}>
            <Text>My Profile</Text>
            <Button color='#2F0000' mode='contained' onPress={()=> {logOutUser()}} >Log Out</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingIndicator:{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default connect(null, {logOutUser} )(home);
