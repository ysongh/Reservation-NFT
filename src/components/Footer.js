import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GlobalContext } from '../context/GlobalState';

export default function Footer() {
  const { navigation, setNavigation } = useContext(GlobalContext);

  const logout = async () => {
    try{
      await AsyncStorage.removeItem('@storage_Key');
      setNavigation(null);
      navigation.replace('Home');
    }
    catch(err){
      console.error(err);
    }
  }
  return navigation ? (
    <View style={styles.container}>
      <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Add Event')}>
        <Icon
          name="add"
          size={25}
        />
        <Text style={styles.btn}>Add Event</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerIcon}  onPress={() => navigation.navigate('Your NFT')}>
        <Icon
          name="book"
          size={25}
        />
        <Text style={styles.btn}>Your NFT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Scanner')}>
        <Icon
          name="camera"
          size={25}
        />
        <Text style={styles.btn}>Scanner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerIcon} onPress={() => logout()}>
        <Icon
          name="arrow-right"
          size={25}
        />
        <Text style={styles.btn}>Logout</Text>
      </TouchableOpacity>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerIcon: {
    padding: 7
  },
  btn: {
    flexDirection: 'row'
  }
});
