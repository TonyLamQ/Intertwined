import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './Components/Welcome';
import { Pet } from "./Components/Pet";
import { PetQualities } from './Components/PetQualities';

export default function App() {
  const petName = {
    firstName: "Roger",
    lastName: "Porticous"
  }

  const qualities = [
    {
      qualOne:'a lizard',
      qualTwo:'enormous',
      qualThree:'scary',
      age:21
    },
    {
      qualOne:'green',
      qualTwo:'small',
      qualThree:'happy',
      age:16
    },
  ]

  
  return (
    <View style={styles.container}>
      <Welcome name="jack" age={37} gender={true} />
      <Pet petName={petName} type='Komodo Dragon'/>
      <PetQualities qualities={qualities}/>
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
