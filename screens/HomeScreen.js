import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen({ username }) {
  return (
    <View style={styles.container}>
      <Text>Welcome, {username || 'Guest'}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
