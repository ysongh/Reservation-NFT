import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

export default function QRcodeScreen({ route, navigation }) {
  const { tokenURI } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your QR Code</Text>
      <Text style={styles.p}>Show this to the event host</Text>
      <QRCode
        size={225}
        value={tokenURI}
      />
      <Button buttonStyle={styles.btn} onPress={() => navigation.navigate('Your NFT')} type="outline" title="Back" />
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
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  p: {
    fontSize: 20,
    color: '#807575',
    marginBottom: 30
  },
  qr: {
    width: 300
  },
  btn: {
    marginTop: 100,
    width: "100%"
  }
});
