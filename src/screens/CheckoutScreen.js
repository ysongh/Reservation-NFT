import React, { useEffect, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../axios';

export default function EventDetailScreen({ route, navigation }) {
  const { event } = route.params;
  const [userData, setUserData] = useState({});
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      try{
        const jsonValue = await AsyncStorage.getItem('@storage_Key');

        const {data} = await axios.put('/blockchain/getbalance', {privateKey: JSON.parse(jsonValue).privateKey});
        setBalance(data.CELO_balance);
        setUserData(JSON.parse(jsonValue));
      }
      catch(err){
        console.error(err);
      }
    }

    getBalance();
  }, [])

  const reservseEvent = async () => {
    try{
      const jsonValue = await AsyncStorage.getItem('@storage_Key');

      const data = {
        privateKey: JSON.parse(jsonValue).privateKey,
        name: name
      }

      const res = await axios.post(`/event/mintnft/${event._id}`, data);
      navigation.replace('List');
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.balanceLabel}>Current Balance</Text>
      <Text style={styles.balanceValue}>{balance / 10**18} Celo</Text>

      <View style={styles.eventDetail}>
        <Text style={styles.title} h3>{event.name}</Text>
        <Text style={styles.p}>{event.location}</Text>
        <Text style={styles.p}>{event.date}</Text>
      </View>

      <Text style={styles.balanceLabel}>Wallet Address</Text>
      <Text style={styles.balanceValue}>{userData.walletAddress?.substring(0,7)}...{userData.walletAddress?.substring(35,42)}</Text>

      <View style={{marginVertical: 10}}></View>

      <Text style={styles.balanceLabel}>Price</Text>
      <Text style={styles.balanceValue}>{event.price} Celo</Text>
      
      <View style={{marginVertical: 10}}></View>

      <Input
        value={name}
        placeholder="Your Name"
        autoCorrect
        onChangeText={(text) => setName(text)}
        clearButtonMode="while-editing"
      />

      <View style={{marginVertical: 10}}></View>

      <Button buttonStyle={{ backgroundColor: '#6643B5' }} onPress={() => reservseEvent()} title="Pay" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15
  },
  balanceLabel: {
    color: '#807575',
    fontSize: 15
  },
  balanceValue:{
    fontWeight: 'bold',
    fontSize: 25
  },
  eventDetail: {
    backgroundColor: '#E0DCDC',
    padding: 15,
    marginVertical: 20
  },
  title: {
    marginBottom: 10
  },
  p: {
    fontSize: 20,
    color: '#807575',
    marginBottom: 10
  },
  detail: {
    fontSize: 17,
    marginVertical: 20,
  }
});
