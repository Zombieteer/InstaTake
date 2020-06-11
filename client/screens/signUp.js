import React, { useState } from 'react';
import {connect} from 'react-redux'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Button, TextInput, Divider } from 'react-native-paper';
import {registerUser} from '../states/actions/authActions'

export const signUp = ({registerUser}) => {
    const [user, setUser] = useState({
        name: 'aryan',
        email: 'aryan.nigAM@gmail.com',
        password: '12345ASD',
        password2: '12345ASD',
    });
    
    const { name, email, password, password2 } = user;

    const submitDetails =() => {registerUser(user)
        // setUser({
        //     name: '',
        //     email: '',
        //     password: '',
        //     password2: '',
        // })
    }
    return (
        <ScrollView >
            <View style={styles.form}>
                {/* <KeyboardAvoidingView behavior='position'> */}
                <Image source={require('../Icons/instatake-white.png')} style={styles.logo} />
                <View>
                    <TextInput style={styles.placeholder} label='UserName' theme={{ colors: { primary: '#2F0000' } }} mode="outlined" value={name} onChangeText={text=>{setUser({...user, name:text})}} />
                    <TextInput style={styles.placeholder} label='Email' theme={{ colors: { primary: '#2F0000' } }} mode="outlined" value={email} onChangeText={text=>{setUser({...user, email:text})}}/>
                    <TextInput style={styles.placeholder} secureTextEntry label='Password' theme={{ colors: { primary: '#2F0000' } }} mode="outlined" value={password} onChangeText={text=>{setUser({...user, password:text})}}/>
                    <TextInput style={styles.placeholder} secureTextEntry label='Enter Password again' theme={{ colors: { primary: '#2F0000' } }} mode="outlined" value={password2} onChangeText={text=>{setUser({...user, password2:text})}}/>
                    <Button style={styles.button} color='#2F0000' mode='contained' onPress={() => console.log(user)} onPress={submitDetails}>Sign Up</Button>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <Divider style={styles.divider} />
                    <Text>OR</Text>
                    <Divider style={styles.divider} />
                </View>
                <View style={styles.loginDiv}>
                    <Text>Already have an account ?</Text>
                    <TouchableOpacity>
                        <Text style={styles.logInText}>Log In.</Text>
                    </TouchableOpacity>
                </View>
                {/* </KeyboardAvoidingView> */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: '80%',
        height: 50,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 15,
    },
    form: {
        width: '80%',
        alignSelf: 'center'
    },
    placeholder: {
        fontSize: 12,
        // marginTop: 10,
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        borderRadius: 8,
        width: '50%',
        alignSelf: 'center'
    },
    divider: {
        width: '40%',
        margin: 10,
        backgroundColor: '#9C9C9C'
    },
    loginDiv: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    logInText: {
        fontWeight: "bold",
        paddingLeft: 10
    }
});

export default connect(null,{registerUser})(signUp);
