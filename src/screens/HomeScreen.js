import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const hero = require ('../images/hero.png');

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
			<Image
        source={hero}
        style={{ width: '100%', height: 400 }}
      />
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>Reserve your spot at event with NFT</Text>
        <Text style={styles.subTitle}>We use NFT to reserve your spot at event</Text>
        <Button buttonStyle={{ backgroundColor: '#6643B5' }} onPress={() => navigation.navigate('Login')} title="Get Started" />
        <Text style={styles.p}>* Wallet is required</Text>
      </View>
		</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 20,
    color: '#807575',
    textAlign: 'center',
    marginBottom: 50
  },
  p: {
    marginTop: 5,
    color: '#807575',
    fontSize: 15,
    fontWeight: 100
  },
});
