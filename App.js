import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import Footer from './screens/Footer'; // Импортируйте компонент Footer

const Stack = createStackNavigator();

const BASE_URL = 'http://127.0.0.1:8000';

export default function App() {
  const [authToken, setAuthToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@MyApp:authToken', authToken);
      console.log('Token saved successfully.');
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const loadData = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('@MyApp:authToken');
      if (savedToken !== null) {
        setAuthToken(savedToken);
        setIsLoggedIn(true);
        const savedUsername = await AsyncStorage.getItem('@MyApp:username');
        setUsername(savedUsername);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogin = async (isLoggedIn, username) => {
    setIsLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      setAuthToken('your_token_here');
      saveData();
      const savedUsername = await AsyncStorage.getItem('@MyApp:username');
      setUsername(savedUsername);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    AsyncStorage.removeItem('@MyApp:authToken');
    setUsername('');
  };

  return (
    <View style={styles.appContainer}>
      <NavigationContainer>
        <Stack.Navigator>
          {!authToken ? (
            <Stack.Screen 
              name="Login" 
              options={{ headerShown: false }}
            >
              {(props) => <Login {...props} onLogin={handleLogin} baseUrl={BASE_URL} />} 
            </Stack.Screen>
          ) : (
            <Stack.Screen 
              name="Home" 
              options={{
                headerTitle: `Welcome, ${username || 'Guest'}`,
                headerRight: () => (
                  <View style={styles.buttonContainer}>
                    <Pressable onPress={handleLogout}>
                      <Text style={styles.logoutText}>Logout</Text>
                    </Pressable>
                  </View>
                ),
              }}
            >
              {props => <HomeScreen {...props} username={username} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Footer handleLogout={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginRight: 10,
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
  },
  appContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1C1C1C',
  }
});
