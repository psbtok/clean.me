import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants/colors.js';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

export default function Login({ onLogin, baseUrl }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${baseUrl}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        const userId = data.id;
        console.log("USERNAME SAVING");
        await AsyncStorage.setItem('@MyApp:username', username);
        console.log("ID SAVING");

        await AsyncStorage.setItem('@MyApp:id', toString(userId));
  
        onLogin(true);
        showToast(ALERT_TYPE.SUCCESS, 'Success', 'Login successful!');
      } else {
        console.error('Login failed:', response.statusText);
        showToast(ALERT_TYPE.ERROR, 'Error', 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      showToast(ALERT_TYPE.ERROR, 'Error', 'An error occurred while logging in.');
    }
  };

  const showToast = (type, title, textBody) => {
    Toast.show({
      type,
      title,
      textBody,
    });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.containerUpper}>
          <Text style={styles.textMain}>Автомойки {'\n'}рядом.</Text>
          <Pressable onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Создать аккаунт</Text>
          </Pressable>
      </View>
      <View style={styles.containerLower}>
        <Text style={styles.textSub}>Уже есть аккаунт? </Text>
        <Text style={[styles.textSub, styles.linkText]}>Войти</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerUpper: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  containerLower: {
    height: 64,
    backgroundColor: colors.black,
    flexDirection: 'row', // Set flexDirection to 'row'
    justifyContent: 'center',
    alignItems: 'center', // Align items vertically to center
  },
  textMain: {
    marginBottom: 24,
    width: '100%',
    fontSize: 34,
    textAlign: 'left',
    fontWeight: '500',
    color: colors.grey5,
  },
  textSub: {
    fontSize: 16,
    marginBottom: 12,
    paddingRight: 1,
    color: colors.grey4,
  },
  button: {
    width: '100%',
    backgroundColor: colors.confirmBlue,
    padding: 12,
    paddingBottom: 14,
    borderRadius: 100,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  linkText: {
    color: colors.confirmBlue
  }
});
