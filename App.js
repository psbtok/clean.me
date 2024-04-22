import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // Import the HomeScreen component from screens directory
import Login from './screens/Login'; // Import the Login component from screens directory

const Stack = createStackNavigator();

export default function App() {
  const [authToken, setAuthToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load data from AsyncStorage when the component mounts
  useEffect(() => {
    loadData();
  }, []);

  // Save data to AsyncStorage
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@MyApp:authToken', authToken);
      console.log('Token saved successfully.');
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  // Load data from AsyncStorage
  const loadData = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('@MyApp:authToken');
      if (savedToken !== null) {
        setAuthToken(savedToken);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error loading token:', error);
    }
  };

  // Handle login
  const handleLogin = isLoggedIn => {
    setIsLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      setAuthToken('your_token_here');
      saveData(); // Save the token to AsyncStorage
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    AsyncStorage.removeItem('@MyApp:authToken'); // Remove the token from AsyncStorage
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!authToken ? (
          <Stack.Screen 
            name="Login" 
            options={{ headerShown: false }} // Hide header for login screen
          >
            {props => <Login {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
              headerRight: () => (
                <Button title="Logout" onPress={handleLogout} />
              ),
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
