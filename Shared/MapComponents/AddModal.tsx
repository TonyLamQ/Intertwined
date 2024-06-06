import React from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';
import colors from '../../utils/colors';

export default function AddModal({ visible, onLocationChange, onSave, onClose }:any) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Add new location</Text>
          <TextInput
            style={styles.modalText}
            onChangeText={onLocationChange}
            placeholder="Enter location"
          />
          <Button title="Save" onPress={onSave} color={colors.secondary} />
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
  }
});