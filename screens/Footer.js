import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from './constants/colors';

const Footer = ({ handleLogout }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => console.log('Главная')}>
        <Text style={styles.buttonText}>Главная</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log('Карта')}>
        <Text style={styles.buttonText}>Карта</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log('Профиль')}>
        <Text style={styles.buttonText}>Профиль</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log('Меню')}>
        <Text style={styles.buttonText}>Меню</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    width: '25%',
    paddingVertical: 12,
    backgroundColor: colors.grey2,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.grey4,
  },
});

export default Footer;
