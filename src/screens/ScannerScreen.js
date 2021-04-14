import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';

const outline = require('../images/outline.png');

export default function ScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={[StyleSheet.absoluteFill, styles.container]}>
        <Text style={styles.title}>Scan QR Code</Text>
        <Text style={styles.p}>To confirm they pay for the event</Text>
        <Image
          style={styles.qr}
          source={outline}
        />
        <Button buttonStyle={styles.btn} onPress={() => navigation.navigate('List')} title="Back" />
    </BarCodeScanner>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    marginTop: '15%',
    textAlign: 'center',
    color: 'white',
  },
  qr: {
    width: 250,
    height: 250,
    marginTop: 10
  },
  p: {
    fontSize: 20,
    color: '#E3D9D9',
    marginBottom: 30
  },
  btn: {
    marginTop: 80,
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: 'transparent'
  }
});
