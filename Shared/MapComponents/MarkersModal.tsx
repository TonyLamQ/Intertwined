import React, { useState } from 'react';
import { Modal, View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import colors from '../../utils/colors';

export default function MarkersModal({ visible, markers, userLocationName, onClose, onNavigate }:any) {
  const [expandedMarkerId, setExpandedMarkerId] = useState(null);
  const [animation] = useState(new Animated.Value(0));

  const handleRowPress = (item:any) => {
    if (expandedMarkerId === item.id) {
      resetAnimation();
      setExpandedMarkerId(null);
    } else {
      startAnimation();
      setExpandedMarkerId(item.id);
    }
  }
  
  
  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Reset the animation value to 0 after the animation completes
      animation.setValue(0);
    });
  };
  
  const resetAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Reset the animation value to 0 after the animation completes
      animation.setValue(0);
    });
  };
  
  
  

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
              <TouchableOpacity onPress={()=>{
                handleRowPress(item);
              }}>
                <View style={{flexDirection: 'column'}}>
                  <View style={styles.markersItem}>
                    <Text>{item.latitude}, {item.longitude}</Text>
                    <TouchableOpacity onPress={() => {
                        onNavigate(item.latitude, item.longitude);
                      }}>
                        <AntDesign name="arrowright" size={24} color={colors.secondary} />
                    </TouchableOpacity>
                  </View>
                  {item.id === expandedMarkerId && (
                    <Animated.View style={[styles.expandedContainer, {  }]}>
                      <TouchableOpacity onPress={()=>{}}>
                        <FontAwesome6 name="circle-info" size={24} color={colors.white} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{}}>
                        <FontAwesome6 name="edit" size={24} color={colors.white} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{}}>
                        <FontAwesome6 name="trash" size={24} color={colors.white} />
                      </TouchableOpacity>
                    </Animated.View>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />

          {/* <Modal 
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>Modal inside modal</Text>
              </View>
            </View>
          </Modal> */}

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
    },
    expandedContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: colors.primary,
      width: '100%',
    },
  });