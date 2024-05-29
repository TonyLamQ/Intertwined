import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import colors from '../utils/colors';
import { FontAwesome6 } from '@expo/vector-icons';

export default function MapScreen() {
    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      <TouchableOpacity style={styles.AddButton} onPress={() => {}}>
        <FontAwesome6 name="add" size={24} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.ListButton} onPress={() => {}}>
        <FontAwesome6 name="list-ul" size={24} color={colors.white} />
      </TouchableOpacity>
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
