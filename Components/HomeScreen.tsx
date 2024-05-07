import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackList } from '../Classes/StackList';

type NavigationProp = StackNavigationProp<StackList, 'home'>;
type Props = {
  navigation: NavigationProp;
};

export default function HomeScreen({navigation}: Props) {
    return (
        <View style={styles.container}>
          <Text>Home!</Text>
          <Button title="Click me" onPress={()=>{
              navigation.navigate('settings');
          }}/>
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
