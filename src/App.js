import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ListScreen from './screens/ListScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import AddEventScreen from './screens/AddEventScreen';
import NFTScreen from './screens/NFTScreen';
import CheckoutScreen from './screens/CheckoutScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Event Detail" component={EventDetailScreen} />
        <Stack.Screen name="Add Event" component={AddEventScreen} />
        <Stack.Screen name="Your NFT" component={NFTScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
