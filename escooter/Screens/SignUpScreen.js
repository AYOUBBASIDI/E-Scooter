import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';


const SignUpScreen = ({navigation}) => {
    const onPressSignUp = () => {
        const options = {
            url: 'http://192.168.10.34:8080/api/escooter/v1/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: email,
                pwd: password,
                username: username,
            },
        };
        axios(options)
        .then(response => {
            console.log(response.data);
        });
    };
    const onPressLogin = () => {
        navigation.replace('LoginScreen');
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUser] = useState('');
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo}/>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#a1a1a1"
                    onChangeText={text => setEmail(text)} />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Username"
                    placeholderTextColor="#a1a1a1"
                    onChangeText={text => setUser(text)} />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="#a1a1a1"
                    onChangeText={text => setPassword(text)} />
            </View>
            <TouchableOpacity
                onPress={onPressSignUp}
                style={styles.signUpBtn}>
                <Text style={styles.signText}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPressLogin}>
                <Text style={styles.LoginText}>I Have An Account</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 145,
        height: 150,
        marginBottom: 50,
    },
    inputView: {
        width: "90%",
        backgroundColor: "#dedede",
        borderRadius: 5,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "#1f1e1e"
    },
    LoginText: {
        color: "#1f1e1e",
        marginTop: 20,
        marginBottom: 20,
    },
    signUpBtn: {
        width: "90%",
        backgroundColor: "#1f1e1e",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    signText: {
        color: "white"
    }
});
export default SignUpScreen;