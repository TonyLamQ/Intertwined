import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackList } from '../Classes/StackList';
import colors from '../utils/colors';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<StackList, 'home'>;
type Props = {
  navigation: NavigationProp;
};

export default function HomeScreen({navigation}: Props) {
    const [enteredText, setEnteredText] = useState('');
    const [resultText, setResultText] = useState('');
    return (
        <View style={styles.container}>
          <View style={styles.languageContainer}>
            <TouchableOpacity
              style={styles.languageOption}
              onPress={()=> {navigation.navigate("languageSelection", {title: "Translate from"})}}>
              <Text style={styles.languageOptionText}>English</Text>
            </TouchableOpacity>
            <View style={styles.arrowContainer}>
              <AntDesign name="arrowright" size={24} color={colors.lightGray}  />
            </View>
            <TouchableOpacity
              style={styles.languageOption}
              onPress={()=> {navigation.navigate("languageSelection", {title: "Translate to"})}}>
              <Text style={styles.languageOptionText}>French</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
          	<TextInput style={styles.textInput}
              multiline
              placeholder='enter text'
              onChangeText={(text)=> setEnteredText(text)}
              />

              <TouchableOpacity style={styles.iconContainer}
                disabled={enteredText === ""}>
                <Ionicons 
                  name="arrow-forward-circle-sharp" 
                  size={24} 
                  color={enteredText !== "" ? colors.primary : colors.primaryDisabled} />
              </TouchableOpacity>
          </View>
          
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {resultText}
            </Text>

            <TouchableOpacity style={styles.iconContainer}
                disabled={resultText === ""}>
                  <FontAwesome6 name="copy" size={24} color={resultText !== "" ? colors.primary : colors.primaryDisabled} />
              </TouchableOpacity>
          </View>

          <View style={styles.historyContainer}></View>

        </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  languageContainer: {
    flexDirection: 'row',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  languageOption:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15
  },
  arrowContainer:{
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageOptionText: {
    color: colors.secondary,
    fontFamily: 'regular',
    letterSpacing: 0.3
  },
  inputContainer:{
    flexDirection: 'row',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    height:90,
  },
  textInput:{
    flex: 1,
    marginTop:10,
    paddingHorizontal:20,
    fontFamily: 'regular',
    letterSpacing: 0.3,
    color: colors.black,
    textAlignVertical: 'top'
  },
  iconContainer:{
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultContainer:{
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    height:90,
    flexDirection: 'row'
  },
  resultText:{
    flex: 1,
    marginTop:10,
    paddingHorizontal:20,
    fontFamily: 'regular',
    letterSpacing: 0.3,
    color: colors.black,
  },
  historyContainer:{
    backgroundColor: colors.grayBg,
    flex:1
  }
});
