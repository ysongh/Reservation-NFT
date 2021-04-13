import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EventHorizontalCard from '../components/EventHorizontalCard';

export default function ListScreen({ navigation }) {
  const logout = async () => {
    try{
      await AsyncStorage.removeItem('@storage_Key');
      navigation.replace('Home');
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} h2>Discover</Text>
      <EventHorizontalCard />
      <EventHorizontalCard />
      <EventHorizontalCard />
      <Button onPress={() => logout()} title="Logout" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15 
  },
  title: {
    marginTop: 20,
    marginBottom: 20
  }
});
