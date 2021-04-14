import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../axios';

export default function NFTScreen({ navigation }) {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    async function fetchNFT(){
      try{
        const jsonValue = await AsyncStorage.getItem('@storage_Key');

        const { data } = await axios.put('/blockchain/getusertokens', {privateKey: JSON.parse(jsonValue).privateKey});
        setNFTs(data.data);
        console.log(data.data);
      }
      catch(err){
        console.error(err);
      }
    }

    fetchNFT();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title} h2>NFT</Text>
      {
        nfts.map((token) => (
          <ListItem key={token.tokenId} bottomDivider  onPress={() => navigation.navigate("QRcode", {tokenURI: token.tokenURI})}>
            <ListItem.Content>
              <ListItem.Title>Token Id: {token.tokenId}</ListItem.Title>
              <ListItem.Subtitle>Token URI: {token.tokenURI}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15 
  },
  title: {
    marginTop: 20,
    marginBottom: 20
  }
});
