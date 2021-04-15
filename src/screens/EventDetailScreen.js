import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ButtonGroup, Text, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../axios';

export default function EventDetailScreen({ route, navigation }) {
  const { eventId } = route.params;
  const [event, setEvent] = useState({});

  useEffect(() => {
    async function fetchEvent(){
      try{
        const { data } = await axios.get(`/event/detail/${eventId}`);
        setEvent(data.data);
      }
      catch(err){
        console.error(err);
      }
    }

    fetchEvent();
  }, [eventId])

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://gateway.pinata.cloud/ipfs/" + event.image || "x" }}
        style={{ width: '100%', height: 300 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.eventDetail}>
        <Text style={styles.title} h2>{event.name}</Text>
        <Text style={styles.p}>{event.location}</Text>
        <Text style={styles.p}>{event.date}</Text>
        <Text style={styles.detail}>{event.description}</Text>
        <ButtonGroup
          onPress={() => navigation.navigate("Checkout", {event: event})}
          buttons={[`$ ${event.price || ""} `, 'Reserse']}
          containerStyle={{height: 50}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventDetail: {
    padding: 15
  },
  title: {
    marginTop: 10,
    marginBottom: 10
  },
  p: {
    fontSize: 15,
    color: '#807575',
    marginBottom: 10
  },
  detail: {
    fontSize: 17,
    marginVertical: 20,
  }
});
