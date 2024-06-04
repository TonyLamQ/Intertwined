import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Button, TextInput, FlatList } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import colors from '../utils/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { MarkerType } from '../types/Marker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { AntDesign } from '@expo/vector-icons';

export default function MapScreen() {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [addModalVisible, setAddModalVisible] = useState(false);
    const [markersModalVisible, setMarkersModalVisible] = useState(false);

    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
    const [userLocationName, setUserLocationName] = useState<string | null>(null);

    const [locationInput, setLocationInput] = useState(''); 
    const [markers, setMarkers] = useState<MarkerType[]>([]);

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
          return;
        }
        const locations = await Location.geocodeAsync(locationInput, );
        if (locations.length === 0) {
          setAddModalVisible(false);
          console.log('Location not found');
          return;
        }
        // for (let location of locations) {
        //   console.log(location);
        // }
        if (locations.length > 1) {
          console.log('Multiple locations found', locations);
          return;
        }
        if (locations.length > 0) {
          setMarkers([...markers, {id: uuidv4(), latitude: locations[0].latitude, longitude: locations[0].longitude }]);
        }


        setAddModalVisible(false);
    };

    const handleCloseListPress = () => {
      setMarkersModalVisible(false);
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            try {
                let userLocation = await Location.getCurrentPositionAsync({
                  accuracy: Location.Accuracy.Highest,
                });
                setUserLocation(userLocation);
              } catch (error) {
                console.error(error);
                setErrorMsg('Failed to fetch location');
                console.log(errorMsg)

              }
        })();
    },[]);
  return (
      <View style={styles.Container}>
        {errorMsg?(<Text>{errorMsg}</Text>):null}
        {userLocation?(<MapView
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => {
          setAddModalVisible(!addModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalText}
              onChangeText={setLocationInput}
              value={locationInput}
              placeholder="Enter location"
            />
            <Button title="Save" onPress={handleSavePress} color={colors.secondary} />
          </View>
        </View>
      </Modal>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={markersModalVisible}
        onRequestClose={() => {
          setMarkersModalVisible(!markersModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>List of markers</Text>
            <Text>Current Location:</Text>
            <Text style={styles.modalText}>{userLocationName}</Text>
            <FlatList 
              data={markers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity>
                <View style={styles.markersItem}>
                  <Text>{item.latitude}, {item.longitude}</Text>
                  <TouchableOpacity onPress={() => {
                    console.log('Navigate to', item.latitude, item.longitude);
                  }}>
                  <AntDesign name="arrowright" size={24} color={colors.secondary} />
                  </TouchableOpacity>
                </View>
                </TouchableOpacity>
              )}
            />
            <Button title="Close" onPress={handleCloseListPress} color={colors.secondary} />
          </View>
        </View>
      </Modal>
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalHeader: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  markersItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    width: '100%',
  }
});