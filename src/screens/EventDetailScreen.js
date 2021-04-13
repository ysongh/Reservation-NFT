import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ButtonGroup, Text, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../axios';

export default function EventDetailScreen({ route, navigation }) {
  const { eventId } = route.params;
  const [event, setEvent] = useState({});
  const [balance, setBalance] = useState(0);

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

    const getBalance = async () => {
      try{
        const jsonValue = await AsyncStorage.getItem('@storage_Key');

        const {data} = await axios.put('/blockchain/getbalance', {privateKey: JSON.parse(jsonValue).privateKey});
        setBalance(data.CELO_balance);
      }
      catch(err){
        console.error(err);
      }
    }

    fetchEvent();
    getBalance();
  }, [eventId])

  const reservseEvent = async () => {
    try{
      const jsonValue = await AsyncStorage.getItem('@storage_Key');

      const res = await axios.post(`/event/mintnft/${eventId}`, {privateKey: JSON.parse(jsonValue).privateKey});
      console.log(res);
      navigation.replace('List');
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: event.image }}
        style={{ width: '100%', height: 300 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.eventDetail}>
        <Text style={styles.title} h2>{event.name}</Text>
        <Text style={styles.p}>{event.location}</Text>
        <Text style={styles.p}>{event.date}</Text>

        <Text style={styles.detail}>{event.description}</Text>

        <Text>{balance / 10**18} Celo</Text>
        <ButtonGroup
          onPress={() => reservseEvent()}
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
