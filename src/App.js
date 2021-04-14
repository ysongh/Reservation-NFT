import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { GlobalProvider } from './context/GlobalState';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ListScreen from './screens/ListScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import AddEventScreen from './screens/AddEventScreen';
import NFTScreen from './screens/NFTScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import QRcodeScreen from './screens/QRcodeScreen';
import ScannerScreen from './screens/ScannerScreen';
import ScanResultScreen from './screens/ScanResultScreen';

import Footer from './components/Footer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GlobalProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="List" component={ListScreen} />
            <Stack.Screen name="Event Detail" component={EventDetailScreen} />
            <Stack.Screen name="Add Event" component={AddEventScreen} />
            <Stack.Screen name="Your NFT" component={NFTScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="QRcode" component={QRcodeScreen} />
            <Stack.Screen name="Scanner" component={ScannerScreen} />
            <Stack.Screen name="Scan Result" component={ScanResultScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Footer />
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
