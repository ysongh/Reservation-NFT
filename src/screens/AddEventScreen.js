import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Button, Text, Input, Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../axios';

export default function AddEventScreen({ navigation }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const createEvent = async () => {
    try{
      const jsonValue = await AsyncStorage.getItem('@storage_Key');

      const eventData = {
        name,
        location,
        date,
        image,
        price,
        description,
        email: JSON.parse(jsonValue).email || null
      }

      await axios.post('/event/create-event', eventData);
      navigation.replace('List')
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text h1 style={styles.title}>Add Event</Text>
      <Card>
        <View style={styles.inputContainer}>
          <Input
            value={name}
            placeholder="Name"
            autoCorrect
            onChangeText={(text) => setName(text)}
            clearButtonMode="while-editing"
          />
          <Input
            value={location}
            placeholder="Location"
            onChangeText={(text) => setLocation(text)}
            clearButtonMode="while-editing"
          />
          <Input
            value={date}
            type="date"
            placeholder="Date"
            onChangeText={(text) => setDate(text)}
          />
          <Input
            value={image}
            placeholder="Image URL"
            onChangeText={(text) => setImage(text)}
          />
          <Input
            value={price}
            type="Number"
            onChangeText={(text) => setPrice(text)}
          />
          <Input
            value={description}
            placeholder="Description"
            onChangeText={(text) => setDescription(text)}
            clearButtonMode="while-editing"
          />
          
          <Button style={styles.button} onPress={() => createEvent()} title="Create" />
          <Button style={styles.button} onPress={() => navigation.navigate('List')} type="outline" title="Cancel" />
        </View>
      </Card>

      
      <View style={{ height: 50 }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  title: {
    marginBottom: 10
  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 300,
    marginTop: 15
  }
});
