import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    async function checkToken(){
      try{
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        console.log(jsonValue != null ? JSON.parse(jsonValue) : null);

        if(jsonValue) navigation.replace('List');
      }
      catch(err){
        console.error(err);
      }
  }
    checkToken();
  }, [])
  
  return (
		<View style={styles.container}>
			<Text>Reservation-NFT</Text>
			<Button onPress={() => navigation.navigate('Login')} title="Get Started" />
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
