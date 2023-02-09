import React, { useState , useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar  , Text, Image } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import SearchBar from '../components/SearchBar.js';
import MapStyleChoice from '../components/StyleChoice.js';
import GetLocation from 'react-native-get-location';
import {API_KEY} from '@env';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(API_KEY);

const MainScreen = () => {

    const [coordinate, setCoordinates] = useState([32.309879, -9.232620]);
    const [currentCoordinate, setCurrentCoordinates] = useState([32.309879, -9.232620]);
    const [zoomLevel, setZoomLevel] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [styleURL, setStyleURL] = useState(MapboxGL.StyleURL.SatelliteStreet);

    const handleZoomIn = () => {
        setZoomLevel(zoomLevel + 1);
      };
    
      const handleZoomOut = () => {
        setZoomLevel(zoomLevel - 1);
      };
    
      const handleSearchSubmit = async () => {
        const query = encodeURI(searchTerm);
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${API_KEY}`);
        const data = await response.json();
        if (data.features.length > 0) {
          setCoordinates(data.features[0].center);
          setZoomLevel(12);
        }
      };
    
      useEffect(() => {
        handleGetCurrentLocation();
      }, []);
    
      const handleGetCurrentLocation = () => {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
        .then(location => {
            setCurrentCoordinates([location.longitude, location.latitude]);
            setCoordinates([location.longitude, location.latitude]);
            setZoomLevel(12);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
      };
    
      //give me array of coordinates from america
      const coordinates = [
        [-122.48369693756104, 37.83381888486939],
        [-122.48348236083984, 37.83317489144141],
        [-122.48339653015138, 37.83270036637107],
        [-122.48356819152832, 37.832056363179625],
        [-122.48404026031496, 37.83114119107971],
        [-122.48404026031496, 37.83049717427869],
        [-122.48348236083984, 37.829920943955045],
        [-122.48356819152832, 37.82954808664175],
        [-122.48507022857666, 37.82944639795659],
        [-122.48610019683838, 37.82880236636284],
        [-122.48695850372314, 37.82931081282506],
        [-122.48700141906738, 37.83080223556934],
        [-122.48751640319824, 37.83168351665737],
        [-122.48803138732912, 37.832158048267786],
        [-122.48888969421387, 37.83297152392784],
        [-122.48987674713133, 37.83263257682617],
        [-122.49043464660643, 37.832937629287755],
      ];
    
    
      return (
        <View style={styles.page}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearchSubmit={handleSearchSubmit} />
          <MapStyleChoice styleURL={styleURL} setStyleURL={setStyleURL} />
          <View style={styles.container}>
            <MapboxGL.MapView style={styles.map} styleURL={styleURL}>
              <MapboxGL.Camera
                zoomLevel={zoomLevel}
                centerCoordinate={coordinate}
              />
              {coordinates.map((item, index) => {
                return <MapboxGL.PointAnnotation key={index} coordinate={item} />
                })
              }
    
              <MapboxGL.PointAnnotation coordinate={currentCoordinate}>
                  <View style={styles.locationMarker}/>
              </MapboxGL.PointAnnotation>
            </MapboxGL.MapView>
            <TouchableOpacity
                style={styles.currentLocationButton}
                onPress={handleGetCurrentLocation}
              >
                <Image
                  style={styles.currentLocationIcon}
                  source={require('../assets/aim.png')}
                />
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={handleZoomIn}>
                <Image
                  style={styles.buttonIcon}
                  source={require('../assets/plus.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleZoomOut}>
                <Image
                  style={styles.buttonIcon}
                  source={require('../assets/minus.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <StatusBar style="auto" />
        </View>
      );
}



const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    buttonsContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      flexDirection: 'column',
      gap: 10,
    },
    button: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 10,
      marginLeft: 10,
      elevation: 5,
    },
    locationMarker: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'blue',
    },
    currentLocationButton: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 10,
      position: 'absolute',
      bottom: 130,
      right: 20,
      elevation: 5,
    },
    currentLocationIcon: {
      width: 30,
      height: 30,
    },
    buttonIcon: {
      width: 20,
      height: 20,
    },
  
  });
  
  export default MainScreen;