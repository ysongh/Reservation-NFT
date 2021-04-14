import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Text, Image } from 'react-native-elements';

export default function EventHorizontalCard({ event, navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: event.image || "x" }}
        style={{ width: 125, height: 125 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.cardText}>
        <View style={styles.row}>
          <Text style={styles.title} h4>{event.name}</Text>
          <Text style={styles.price}>{event.price}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.date}>{event.date}</Text>
          <Button style={styles.btn} onPress={() => navigation.navigate('Event Detail', {eventId: event._id} )} title="View" />
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
    fontSize: 20
  },
  btn: {
    marginTop: 25
  }
});
