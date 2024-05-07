import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Components/HomeScreen';
import SettingsScreen from './Components/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SavedScreen from './Components/SavedScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown:false
      }}>
      <Tab.Screen 
        name ="home"
        component={HomeScreen}
        options={{
          tabBarLabel:"Home",
          tabBarIcon: (props)=> <FontAwesome5 name="home" size={props.size} color={props.color} />
        }}
      />
      <Tab.Screen 
        name ="saved"
        component={SavedScreen}
        options={{
          tabBarLabel:"Saved",
          tabBarIcon: (props)=> <Fontisto name="save" size={props.size} color={props.color} />
        }}
      />
      <Tab.Screen 
        name ="settings"
        component={SettingsScreen}
        options={{
          tabBarLabel:"Settings",
          tabBarIcon: (props)=> <Ionicons name="settings-sharp" size={props.size} color={props.color} />
        }}
      />
    </Tab.Navigator>
  )
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex:1 }}>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen 
              name="main"
              component={TabNavigator}
              options={{
                headerTitle: "Translate"
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
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
