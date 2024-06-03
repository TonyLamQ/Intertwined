import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import colors from '../utils/colors';
import { FontAwesome6 } from '@expo/vector-icons';

export default function MapScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
    const [locationInput, setLocationInput] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleAddPress = () => {
        setModalVisible(true);
    };

    const handleSavePress = () => {
        setModalVisible(false);
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
                  accuracy: Location.Accuracy.Lowest,
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
        </MapView>
      ) : (
        <View style={styles.LoadingContainer}>
          <Text>Loading...</Text>
        </View>
      )}
      <TouchableOpacity style={styles.AddButton} onPress={handleAddPress}>
        <FontAwesome6 name="add" size={24} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.ListButton} onPress={() => {}}>
        <FontAwesome6 name="list-ul" size={24} color={colors.white} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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
            <Button title="Save" onPress={handleSavePress} />
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
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
