import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    Pressable, 
    Animated, 
    StyleSheet, 
    Dimensions
} from 'react-native';
import { colors } from '../../constants/colors.js';
import CustomPhoneInput from '../shared/PhoneInput.js';

const PhoneForm = ({
    toggleInputs,
    fadeAnim,
    phoneNumber,
    setPhoneNumber,
    selectedCountry,
    setSelectedCountry,
    isToggled,
    onValidationChange,
  }) => {
    const screenHeight = Dimensions.get('window').height;

    const validatePhoneNumber = (inputValue) => {
        const expectedFormat = /^\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        return expectedFormat.test(inputValue);
    };

    useEffect(() => {
        const isValid = validatePhoneNumber(phoneNumber);
        onValidationChange(isValid); // Send validation status back to the Login component
    }, [phoneNumber]);

    return (
      <View style={[styles.container, styles.firstContainer]}>
        <Animated.View 
          style={[
            styles.containerUpper, 
            {
              transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -0.1 * screenHeight]
                })
              }]
            }
          ]}>
          <Text style={styles.textMain}>Автомойки</Text>
          <Text style={styles.textMain}>рядом.</Text>
          {/* Phone Input */}
          <Pressable onPress={toggleInputs} style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: isToggled ? 'black' : colors.confirmBlue,
              borderColor: isToggled ? 'white' : 'transparent',
            },
          ]} >
            <Text style={styles.buttonText}>
              {isToggled ? 'Регистрация' : 'Создать аккаунт'}  
            </Text>
          </Pressable>
          <Animated.View 
            style={[
              styles.inputContainer, 
              { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0] }) }] }
            ]}
          >
            <CustomPhoneInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </Animated.View>
        </Animated.View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    height: '100%',
    marginTop: 14,
    justifyContent: 'space-between'
  },
  firstContainer: {
    paddingTop: '80%',
  },
  containerUpper: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    paddingBottom: 0,
  },
  containerLower: {
    height: 64,
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMain: {
    marginBottom: 24,
    marginTop: -36,
    width: '100%',
    fontSize: 34,
    textAlign: 'left',
    fontWeight: '500',
    color: colors.grey5,
  },
  textSub: {
    fontSize: 16,
    marginBottom: 10,
    paddingRight: 1,
    color: colors.grey4,
  },
  button: {
    width: '100%',
    backgroundColor: colors.confirmBlue,
    padding: 12,
    paddingBottom: 14,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  btnContinue: {
    backgroundColor: colors.confirmGreen
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  linkText: {
    color: colors.confirmBlue
  },
  progressDots: {
    marginBottom: 10,
  },
});

export default PhoneForm;
