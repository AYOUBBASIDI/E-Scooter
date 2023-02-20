//splach screen
import React, { useEffect , useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

const SplashScreen = ({navigation}) => {
    const [animating, setAnimating] = useState(true);
    useEffect(() => {
        setTimeout(() => {
          setAnimating(false);
            navigation.replace('LoginScreen');
        }, 4000);
      }, []);
      
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
            />
            <ActivityIndicator animating={animating} size="large" color="#040504" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 145,
        height: 150,
        marginBottom: 50,
    },
});

export default SplashScreen;
