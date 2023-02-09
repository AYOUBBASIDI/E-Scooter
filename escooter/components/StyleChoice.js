import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Image } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

const MapStyleChoice = ({ styleURL, setStyleURL }) => {
    const [showMenu, setShowMenu] = useState(true);
    const animation = useRef(new Animated.Value(0)).current;

    const onShowMenu = () => {
        setShowMenu(!showMenu);
        Animated.timing(animation, {
            toValue: showMenu ? -150 : 0,
            duration: 500,
        }).start();
        console.log(!showMenu)
    };

    useEffect(() => {
        onShowMenu();
    }, []);


    return (
        <View style={styles.mapStyleChoiceContainer}>
            <Animated.View
                style={[
                    styles.mapStyleChoice,
                    { marginLeft: animation },
                ]}
            >
                <TouchableOpacity
                    onPress={() => setStyleURL(MapboxGL.StyleURL.Street)}
                    style={styles.mapStyleButton}
                >
                    <Text style={styles.mapStyleButtonText}>Street</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setStyleURL(MapboxGL.StyleURL.TrafficNight)}
                    style={styles.mapStyleButton}
                >
                    <Text style={styles.mapStyleButtonText}>Traffic Night</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setStyleURL(MapboxGL.StyleURL.SatelliteStreet)}
                    style={styles.mapStyleButton}
                >
                    <Text style={styles.mapStyleButtonText}>Satellite Street</Text>
                </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity style={styles.mapStyleButton} onPress={onShowMenu}>
                <View style={styles.cardStyle}>
                    <Image
                        style={styles.cardImage}
                        source={
                            styleURL === MapboxGL.StyleURL.Street ? require('../assets/s3.png') :
                            styleURL === MapboxGL.StyleURL.TrafficNight ? require('../assets/s2.png') :
                            styleURL === MapboxGL.StyleURL.SatelliteStreet ? require('../assets/s1.jpeg') : null
                            }
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mapStyleChoiceContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        zIndex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
    },
    mapStyleButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
    },
    mapStyleButtonText: {
        fontSize: 15,
        color: "#333"
    },
    mapStyleChoice: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
    },

    cardStyle: {
        width: 50,
        height: 50,
        borderRadius: 10,
        overflow: 'hidden',
    },

});

export default MapStyleChoice;
