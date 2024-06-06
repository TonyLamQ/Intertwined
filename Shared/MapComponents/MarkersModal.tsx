import React from 'react';
import { Modal, View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../utils/colors';

export default function MarkersModal({ visible, markers, userLocationName, onClose, onNavigate }:any) {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
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
                    onNavigate(item.latitude, item.longitude);
                  }}>
                    <AntDesign name="arrowright" size={24} color={colors.secondary} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
          <Button title="Close" onPress={onClose} color={colors.secondary} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
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