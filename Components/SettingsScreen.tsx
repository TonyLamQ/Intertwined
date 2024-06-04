import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function SettingsScreen() {
  useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        console.log('Permission granted');
        try {
            let userLocation = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.Highest,
            });
            console.log(userLocation);
          } catch (error) {
            console.error(error);
            console.log('Failed to fetch location');
          }
    })();
  },[]);

  return (
      <View style={styles.container}>
        <Text>Settings!</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:30
  },
});
