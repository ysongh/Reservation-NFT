import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <Text>List</Text>
      <Button onPress={() => logout()} title="Logout" />
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
