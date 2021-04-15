import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Button, Text, Input, Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

import axios from '../axios';
import { pinataApiKey, pinataSecretApiKey } from '../config';

export default function AddEventScreen({ navigation }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [filename, setFilename] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    setFilename(filename);

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('file', { uri: localUri, name: filename, type });

    if (!result.cancelled) {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": 'multipart/form-data',
          pinata_api_key: pinataApiKey, 
          pinata_secret_api_key: pinataSecretApiKey,
        }
      })
      setImage(res.data.IpfsHash);
    }
  };

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

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(!show);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Card>
        <View style={styles.inputContainer}>
          <Input
            label="Name of the Event"
            value={name}
            autoCorrect
            onChangeText={(text) => setName(text)}
            clearButtonMode="while-editing"
          />
          
          <Input
            label="Price"
            value={price}
            type="Number"
            keyboardType="numeric"
            onChangeText={(text) => setPrice(text)}
          />

          <Input
            label="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
            clearButtonMode="while-editing"
          />

          <Input
            label="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            clearButtonMode="while-editing"
          />

          <Text style={styles.dateLabel}>Date</Text>
          <Button buttonStyle={styles.dateValue} onPress={showDatepicker} title={JSON.stringify(date).slice(1, 11)} />
          {show && (<DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          /> )}

          <Text style={styles.dateLabel}>Image</Text>
          <Button buttonStyle={styles.dateValue} title="Select an image" onPress={pickImage} />
          <Text style={styles.filename}>{filename}</Text>
          
          <Button buttonStyle={styles.button} onPress={() => createEvent()} title="Create" />
        </View>
      </Card>

      
      <View style={{ height: 25 }} />
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
  inputContainer: {
    width: 300
  },
  dateLabel: {
    fontSize: 17,
    color: 'grey',
    fontWeight: 'bold',
    marginLeft: 9
  },
  dateValue: {
    fontSize: 17,
    width: 170,
    marginLeft: 9,
    marginBottom: 10,
  },
  button: {
    width: 300,
    marginTop: 15,
    backgroundColor: "#6643B5"
  },
  filename: {
    fontSize: 10,
    color: 'blue',
    marginLeft: 9,
  }
});
