import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';

export default function LanguageSelection({ navigation, route }: any) {
    const params = route.params || {};
    const {title} = params
    useEffect(()=> {
        navigation.setOptions({
            headerTitle:title
        })
    })
    return (
      <View style={styles.container}>
        <Text>LanguageSelection screen</Text>
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
