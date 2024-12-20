import { StyleSheet, View, Text, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './src/screen/Splash'; // Import Splash
import Home from './src/screen/Home';
import Deetails from './src/screen/Deetails';
import Search from './src/screen/Search';
import { Image } from 'react-native-animatable';
import Accounts from './src/screen/Accounts';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const MyTabs = () => {


  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);



  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#E96E6E',
        tabBarStyle: {
          display: isKeyboardVisible ? 'none' : 'flex',
          backgroundColor: '#383737',
          height: 60,
          width: '85%',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 30,
          borderRadius: 20,
          marginHorizontal: 30
        }
      }}
    >
      <Tab.Screen
        name="HOME"
        component={Home}
        options={{
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={require('./src/assests/Real.png')} />
              <Text style={styles.iconText}>Home</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="SEARCH"
        component={Search}
        options={{
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={require('./src/assests/Search.png')} />
              <Text style={styles.iconText}>Search</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Accounts"
        component={Accounts}
        options={{
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={require('./src/assests/Customer.png')} />
              <Text style={styles.iconText}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MainTabs" component={MyTabs} />
        <Stack.Screen name="Details" component={Deetails} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 25,
    height: 25,
  },

  iconText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  tabContainer: {
    backgroundColor: 'black',
  },
});

export default App;
