import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Image } from 'react-native-elements';

export default function EventHorizontalCard() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "" }}
        style={{ width: 125, height: 125 }}
      />
      <View style={styles.cardText}>
        <View style={styles.row}>
          <Text style={styles.title} h3>Item Name</Text>
          <Text style={styles.price}>$1.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.date}>Dec 12, 2021 at 4:00pm</Text>
          <Button style={styles.btn} title="View" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20
  },
  cardText: {
    padding: 10,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold'
  },
  date: {
    marginTop: 25
  },
  price: {
    fontSize: 20,
    display: 'block',
  },
  btn: {
    marginTop: 25
  }
});
