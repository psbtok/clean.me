import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors.js';

const PasswordForm = ({ password, repeatPassword, setPassword, setRepeatPassword, setIsPasswordValid }) => {
  
  // State variable to track if the passwords are valid
  const [isPasswordValid, setIsPasswordValidState] = useState(false);

  // Function to update isPasswordValid state
  const updatePasswordValidity = () => {
    const isValid = password === repeatPassword && password !== '' && repeatPassword !== '';
    setIsPasswordValidState(isValid);
    setIsPasswordValid(isValid); // Call the prop function to update the parent component
  };

  // Call updatePasswordValidity whenever password or repeatPassword changes
  useEffect(() => {
    updatePasswordValidity();
  }, [password, repeatPassword]);

  return (
    <View style={styles.container}>
      <View style={styles.containerUpper}>
        <Text style={styles.textMain}>Придумайте пароль</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder='Пароль'
          maxLength={32} // Adjust maxLength as needed
        />
        <TextInput
          style={styles.input}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          secureTextEntry={true}
          placeholder='Повторите пароль'
          maxLength={32} // Adjust maxLength as needed
        />
      </View>
    </View>
  );
};

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
    paddingBottom: 0,
  },
  textMain: {
    marginBottom: 24,
    marginTop: -36,
    width: '100%',
    fontSize: 21,
    textAlign: 'center',
    fontWeight: '500',
    color: colors.grey5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 18,
  },
});

export default PasswordForm;
