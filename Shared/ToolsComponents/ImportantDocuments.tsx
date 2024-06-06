import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../utils/colors';

export default function ImportantDocuments() {
  return (
      <View style={styles.ViewContainer}>
        <Text>Documents</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    ViewContainer: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:20,
        paddingBottom:10,
        borderRadius: 20,
        marginBottom: 20,
      },
});
