import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import colors from '../utils/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { MarkerType } from '../types/Marker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AddModal from '../Shared/MapComponents/AddModal';
import MarkersModal from '../Shared/MapComponents/MarkersModal';

export default function MapScreen() {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [markersModalVisible, setMarkersModalVisible] = useState(false);

    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
    const [userLocationName, setUserLocationName] = useState<string | null>(null);

    const [locationInput, setLocationInput] = useState(''); 
    const [markers, setMarkers] = useState<MarkerType[]>([]);

    const mapRef = useRef(null);

    const handleAddPress = () => {
        setLocationInput('');
        setAddModalVisible(true);
    };

    const handleListPress = async () => {
      setMarkersModalVisible(true);
      const userLocationName = await Location.reverseGeocodeAsync({latitude: userLocation?.coords.latitude!, longitude: userLocation?.coords.longitude!});
      setUserLocationName(userLocationName[0].country+"-"+userLocationName[0].region+"-"+userLocationName[0].name);
  };

    const handleSavePress = async () => {
        if (!locationInput) {
          setAddModalVisible(false);
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'No location entered',
            text2: 'Please enter a location to add.',
          });
          return;
        }
        const locations = await Location.geocodeAsync(locationInput, );
        if (locations.length === 0) {
          setAddModalVisible(false);
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Location not found',
            text2: 'Location not added, please try again.',
          });
          return;
        }
        if (locations.length > 0) {
          setMarkers([...markers, {id: uuidv4(), latitude: locations[0].latitude, longitude: locations[0].longitude }]);
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Location added',
            text2: 'Location has been added successfully',
          });
        }
        setAddModalVisible(false);
    };

    const handleCloseListPress = () => {
      setMarkersModalVisible(false);
    };

    const navigateTo = (latitude:number, longitude:number) => {
      setMarkersModalVisible(false);
      if (mapRef.current) {
        (mapRef.current as any).animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000); // duration in milliseconds
      }
    };
    
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            try {
                let userLocation = await Location.getCurrentPositionAsync({
                  accuracy: Location.Accuracy.Highest,
                });
                setUserLocation(userLocation);
              } catch (error) {
                console.error(error);
              }
        })();
    },[]);
  return (
      <View style={styles.Container}>
        {userLocation?(<MapView
          ref={mapRef}
          style={styles.MapView}
          initialRegion={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="You are here"
          />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={locationInput}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.LoadingContainer}>
          <Text>Loading...</Text>
        </View>
      )}
      <TouchableOpacity style={styles.AddButton} onPress={handleAddPress}>
        <FontAwesome6 name="add" size={24} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.ListButton} onPress={handleListPress}>
        <FontAwesome6 name="list-ul" size={24} color={colors.white} />
      </TouchableOpacity>

      <AddModal 
        visible={addModalVisible} 
        onLocationChange={setLocationInput} 
        onSave={handleSavePress} 
        onClose={() => setAddModalVisible(false)}
      />
      
      <MarkersModal 
        visible={markersModalVisible} 
        markers={markers} 
        userLocationName={userLocationName!} 
        onClose={handleCloseListPress}
        onNavigate={navigateTo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MapView: {
    width: '100%',
    height: '100%'
  },
  LoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
  },
  ListButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
  },
});