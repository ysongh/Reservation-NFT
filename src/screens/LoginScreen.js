import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import axios from '../axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const userData = {
      email,
      password
    }

    const { data } = await axios.put('/user/login', userData);
    console.log(data);
    //navigation.replace('List')
  }

  const register = async () => {
    const userData = {
      email,
      password
    }

    const { data } = await axios.post('/user/register', userData);
    console.log(data);
    //navigation.replace('List')
  }

  return (
		<View style={styles.container}>

			<Text>Login Screen</Text>
        <Text>Email</Text>
        <TextInput
          value={email}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          clearButtonMode="while-editing"
        />
        <Text>Email</Text>
        <TextInput
          value={password}
          placeholder="Password"
          autoCorrect={false}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          clearButtonMode="while-editing"
        />
      <Button onPress={() => login()} title="Login" />
      <Button onPress={() => register()} title="Register" />
		</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
