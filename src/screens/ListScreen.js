import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../axios';
import EventHorizontalCard from '../components/EventHorizontalCard';

export default function ListScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents(){
      try{
        const { data } = await axios.get('/event/events');
        setEvents(data.data);
      }
      catch(err){
        console.error(err);
      }
    }

    fetchEvents();
  }, [])

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
      {events.map(event => (
        <EventHorizontalCard event={event} key={event._id} navigation={navigation} />
      ))}
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
