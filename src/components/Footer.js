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
      <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('List')}>
        <Icon
          name="list"
          size={25}
          color="white"
        />
        <Text style={styles.label}>List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerIcon}  onPress={() => navigation.navigate('Your NFT')}>
        <Icon
          name="book"
          size={25}
          color="white"
        />
        <Text style={styles.label}>Your NFT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Add Event')}>
        <Icon
          name="add"
          size={25}
          color="white"
        />
        <Text style={styles.label}>Add Event</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Scanner')}>
        <Icon
          name="camera"
          size={25}
          color="white"
        />
        <Text style={styles.label}>Scanner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerIcon} onPress={() => logout()}>
        <Icon
          name="arrow-right"
          size={25}
          color="white"
        />
        <Text style={styles.label}>Logout</Text>
      </TouchableOpacity>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2794EB'
  },
  footerIcon: {
    padding: 7
  },
  label: {
    color: 'white'
  }
});
