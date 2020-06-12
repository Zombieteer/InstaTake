import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Button, TextInput, Divider } from 'react-native-paper';
import { loginUser } from '../states/actions/authActions'

export const logIn = ({ auth: { isAuthenticated }, loginUser, ...props }) => {

    const [user, setUser] = useState({
        email: 'aryan.nigAM@gmail.com',
        password: '12345ASD',
    });
    const { email, password } = user;

    const submitDetails = () => {
        if (email === '' || password === '') console.log('Enter all fields')
        else loginUser(user)
        setUser({
            email: 'aryan.nigAM@gmail.com',
            password: '12345ASD'
        })
        console.log(isAuthenticated)
    }

    return (
        <ScrollView >
            <View style={styles.form}>
                {/* <KeyboardAvoidingView behavior='position'> */}
                <Image source={require('../Icons/instatake-white.png')} style={styles.logo} />
                <View>
                    <TextInput style={styles.placeholder} label='Email' theme={{ colors: { primary: '#2F0000' } }} mode="outlined" value={email} onChangeText={text => { setUser({ ...user, email: text }) }} />
                    <TextInput style={styles.placeholder} secureTextEntry label='Password' theme={{ colors: { primary: '#2F0000' } }} mode="outlined" value={password} onChangeText={text => { setUser({ ...user, password: text }) }} />
                    <Button style={styles.button} color='#2F0000' mode='contained' onPress={submitDetails}>Log In</Button>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <Divider style={styles.divider} />
                    <Text>OR</Text>
                    <Divider style={styles.divider} />
                </View>
                <View style={styles.loginDiv}>
                    <Text>Doesn't have an account ?</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
                        <Text style={styles.logInText}>Sign Up.</Text>
                    </TouchableOpacity>
                </View>
                {/* </KeyboardAvoidingView> */}
            </View>
        </ScrollView>
    );
};

// logIn.propTypes = {
//     isAuthenticated: PropTypes.bool,
// }

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

const mapStatetoProps = (state) => ({
    auth: state.auth
})

export default connect(mapStatetoProps, { loginUser })(logIn);
