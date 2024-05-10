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
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: 'black',
        // tabBarInactiveTintColor: '',
        tabBarInactiveBackgroundColor: '#AEBF93',
        tabBarStyle: { 
          backgroundColor: "#57733C"
        }
      }}
      >
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
  const [appIsLoaded, setAppisLoaded] = useState<boolean>(false);


  useEffect(()=>{
    const prepare = async () => {
      try{
        await Font.loadAsync({
          regular: require("./assets/fonts/PoetsenOne-Regular.ttf")
        })
      } 
      catch(e) {
        console.log(e)
      }
      finally {
        setAppisLoaded(true);
      }
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if(appIsLoaded){
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if(!appIsLoaded){
    return null;
  }

  return (
    <NavigationContainer>
      <View onLayout={onLayout} style={{ flex:1 }}>
        <Stack.Navigator screenOptions={{
          headerTitleStyle: {
            fontFamily: 'regular'
          },
          headerStyle: {
            backgroundColor: "#AEBF93"
          }
        }}>
          <Stack.Group>
            <Stack.Screen 
              name="main"
              component={TabNavigator}
              options={{
                headerTitle: "Translate",
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
