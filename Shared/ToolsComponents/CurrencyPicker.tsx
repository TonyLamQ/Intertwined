import React from 'react';
import { View, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import colors from '../../utils/colors';
import { Currencies } from '../../Data/Currencies';
import { StyleSheet } from 'react-native';

type CurrencyPickerProps = {
    selectedValue: string;
    onValueChange: (itemValue: string, itemIndex: number) => void;
  };

const CurrencyPicker: React.FC<CurrencyPickerProps> = ({ selectedValue, onValueChange }) => (
    <View style={styles.pickerWrapper}>
      <View style={styles.PickerContainer}>
        <Picker
          style={styles.CurrencyPicker}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          dropdownIconColor={colors.secondary}
          mode='dropdown'
          dropdownIconRippleColor={colors.secondary}
        >
          {Currencies.map((currency, index) => (
            <Picker.Item key={index} label={currency.label} value={currency.value} />
          ))}
        </Picker>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    pickerWrapper: {
      flex:1,
      borderRadius: 20,
      overflow: 'hidden',
      width: 200,
      height: 55,
      marginBottom: 10,
    },
    PickerContainer:{
      flexDirection: 'column',
      alignItems: 'center',
    },
    CurrencyPicker:{
      width: '100%',
      height: '100%',
      backgroundColor: colors.white,
    }
  
  });
  
  export default CurrencyPicker;