import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, Text, Input } from 'react-native-elements';

import axios from '../axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try{
      const userData = {
        email,
        password
      }

      const { data } = await axios.put('/user/login', userData);
      console.log(data);

      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      navigation.replace('List')
    }
    catch(err){
      console.error(err);
    }
  }

  const register = async () => {
    try{
      const userData = {
        email,
        password
      }

      const { data } = await axios.post('/user/register', userData);
      console.log(data);
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      navigation.replace('List')
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>

      <Text h1 style={styles.title}>Login Screen</Text>
      <View style={styles.inputContainer}>
        <Input
          value={email}
          placeholder="Email"
          autoFocus
          type="email"
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          clearButtonMode="while-editing"
        />
        <Input
          value={password}
          placeholder="Password"
          autoCorrect={false}
          secureTextEntry
          type="password"
          onChangeText={(text) => setPassword(text)}
          clearButtonMode="while-editing"
        />
      </View>

      <Button style={styles.button} onPress={() => login()} title="Login" />
      <Button style={styles.button} onPress={() => register()} type="outline" title="Register" />
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
    marginTop: 20
  }
});
