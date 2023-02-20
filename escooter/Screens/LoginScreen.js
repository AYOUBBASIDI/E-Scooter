import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator , TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
    const onPressLogin = async() => {
        setLoading(true);
        const options = {
            url: 'http://192.168.10.34:8080/api/escooter/v1/auth',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: email,
                pwd: password,
            },
        };
        await axios(options)
        .then(response => {
            console.log(response.data);
            navigation.replace('MainScreen');
            setLoading(false);
        });
    };
    const onPressForgotPassword = () => {
        // Do something about forgot password operation
    };
    const onPressSignUp = () => {
        navigation.replace('SignUpScreen');
    };
    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="#a1a1a1"
                    onChangeText={text => setPassword(text)} />
            </View>
            <TouchableOpacity
                onPress={onPressForgotPassword}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            {
                !loading ?
                <TouchableOpacity
                    onPress={onPressLogin}
                    style={styles.loginBtn}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>:
                <TouchableOpacity
                    style={styles.loginBtn}>
                    <ActivityIndicator style={styles.loading} animating={animating} size="small" color="#fff" />
                </TouchableOpacity>
            }
            <TouchableOpacity
            onPress={onPressSignUp}>
                <Text style={styles.SignUpText}>Create an account</Text>
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
    SignUpText: {
        color: "#1f1e1e",
        marginTop: 20,
        marginBottom: 20,
    },
    loginBtn: {
        width: "90%",
        backgroundColor: "#1f1e1e",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    loginText: {
        color: "white"
    },
});
export default LoginScreen;