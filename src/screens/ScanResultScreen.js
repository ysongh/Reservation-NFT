import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Text, Image, Card } from 'react-native-elements';

import axios from '../axios';

export default function ScanResultScreen({ route, navigation }) {
  const { nftId } = route.params;
  const [event, setEvent] = useState({});
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    async function fetchEvent(){
      try{
        const { data } = await axios.get(`/event/nft/${nftId}`);
        setEvent(data.data);
        setName(data.name);
        setDate(data.date);
      }
      catch(err){
        console.error(err);
      }
    }

    fetchEvent();
  }, [nftId])

  return (
    <View style={styles.container}>
      <Text style={styles.title} h2>Summary</Text>
      <Card>
        <Card.Image source={{ uri: event.image || "x" }}>
          <Text style={{marginBottom: 10}}>
            {nftId}
          </Text>
        </Card.Image>
        <Text style={styles.cardTitle} h4>{event.name}</Text>
        <Text style={styles.p}>{event.date}</Text>
        <Text style={styles.p}>{name}</Text>
      </Card>

      <Button buttonStyle={styles.btn} onPress={() => navigation.navigate('Scanner')} title="Scan Again" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  p: {
    fontSize: 15,
    color: '#807575',
    textAlign: 'center',
    marginBottom: 10
  },
  btn: {
    fontSize: 17,
    marginTop: 50,
    marginBottom: 30,
    marginHorizontal: 20,
    backgroundColor: '#6643B5'
  }
});
