import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from './constants/colors.js';
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
      <View style={styles.form}>
        <Text style={styles.textMain}>Необходима авторизация</Text>
        <Text style={styles.textSub}>Для оплаты мойки и начисления бонусных баллов, необходимо зарегистрироваться </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Вход</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey1,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey2,
    width: '90%',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  textMain: {
    marginBottom: 2,
    width: '90%',
    textAlign: 'left',
    fontWeight: '500',
    color: colors.grey5,
  },
  textSub: {
    fontSize: 12,
    marginBottom: 12,
    width: '90%',
    paddingRight: 1,
    color: colors.grey5,
  },
  input: {
    width: '90%',
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    backgroundColor: colors.grey5,
    color: colors.grey2,
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 24,
    backgroundColor: colors.confirmBlue,
    padding: 6,
    paddingBottom: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
