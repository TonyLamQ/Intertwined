import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import { CurrencyRates, getCurrencyByRate } from '../Data/CurrencyRates';
import CurrencyPicker from '../Shared/CurrencyPicker';
import { Octicons } from '@expo/vector-icons';

export default function ValutaConverterComponent() {
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [fromCurrency, setfromCurrency] = useState(CurrencyRates.TRY.toString());
    const [toCurrency, settoCurrency] = useState(CurrencyRates.TRY.toString());

    useEffect(() => {
      convertCurrency();
    }, [fromCurrency, toCurrency, amount]);
    
    const convertCurrency = () => {
      if (amount === '') {
        setConvertedAmount('');
        return;
      }
      const result = ((parseFloat(amount) / parseFloat(fromCurrency)) * parseFloat(toCurrency)).toFixed(2);
      if (isNaN(parseFloat(result))) {
        setConvertedAmount('Invalid amount');
        return;
      }
      setConvertedAmount(result);
    };
    const handleAmountChange = (text: string) => {
      // Regular expression to validate a decimal or integer number
      const validNumberRegex = /^(\d+)?(\.\d+)?$/;
    
      if (validNumberRegex.test(text) || text === '') {
        setAmount(text);
      }
    };
  
    return (
        <View 
          style={styles.ViewContainer}>
          <View style={styles.Header}>
            <Text style={styles.HeaderTitle}>Currency Converter</Text>
            <TouchableOpacity onPress={()=> {
              //switch the currencies
              const temp = fromCurrency;
              setfromCurrency(toCurrency);
              settoCurrency(temp);
            }}> 
              <Octicons style={styles.HeaderIcon} name="arrow-switch" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.AmountInput}
            placeholder="Amount"
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
          />

          <Text style={styles.PickerTitle}>Convert From:</Text>
          <CurrencyPicker selectedValue={fromCurrency} onValueChange={(itemValue, itemIndex) => setfromCurrency(itemValue)} />

          <Text style={styles.PickerTitle}>Convert To:</Text>
          <CurrencyPicker selectedValue={toCurrency} onValueChange={(itemValue, itemIndex) => settoCurrency(itemValue)} />

          {convertedAmount === '' ? (
            <Text style={styles.CurrencyResult}>Converted Amount: </Text>
          ) : convertedAmount !== 'Invalid amount' ? (
            <Text style={styles.CurrencyResult}>
             Converted Amount: {convertedAmount} {getCurrencyByRate(CurrencyRates, parseFloat(toCurrency))}
            </Text>
          ) : (
            <Text style={styles.CurrencyResult}>Amount is invalid.</Text>
          )}
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
  Header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 5,
    width: '100%',
  },
  HeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    position: 'absolute',
    textAlign: 'center', 
    width: '100%', 
  },
  HeaderIcon: {
    position: 'absolute',
    color: colors.white,
    right: 20,
    marginTop: -12,
  },
  PickerTitle: {
    color: colors.black,
    fontSize: 16,
  
  },
  AmountInput: {
    width: 200,
    height: 55,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  CurrencyResult: {
    marginVertical: 5,
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    borderColor: colors.white,
    borderRadius: 20,
    padding: 10,
    backgroundColor: colors.secondary,
  }
});
