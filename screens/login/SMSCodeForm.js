import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors.js';

const SMSCodeForm = ({ smsCode, setSMSCode, setIsSMSCodeValid }) => {
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Function to focus the next input field
  const focusNextInput = (index) => {
    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Function to focus the previous input field
  const focusPreviousInput = (index) => {
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Function to handle text input change
  const handleInputChange = (value, index) => {
    // If the input length is 1 and it's not the last input, focus the next input
    if (value.length === 1 && index < inputRefs.length - 1) {
      setSMSCode((prevSMSCode) => {
        const newSMSCode = prevSMSCode.substring(0, index) + value + prevSMSCode.substring(index + 1);
        focusNextInput(index);
        return newSMSCode;
      });
    }
    // If the input length is 0 and it's not the first input, focus the previous input
    else if (value.length === 0 && index > 0) {
      setSMSCode((prevSMSCode) => {
        const newSMSCode = prevSMSCode.substring(0, index) + value + prevSMSCode.substring(index + 1);
        focusPreviousInput(index);
        return newSMSCode;
      });
    }
    // If the input length is 1 and it's the last input, blur the input
    else if (value.length === 1 && index === inputRefs.length - 1) {
      setSMSCode((prevSMSCode) => {
        const newSMSCode = prevSMSCode.substring(0, index) + value;
        inputRefs[index].current.blur();
        return newSMSCode;
      });
    }
    // Otherwise, update the SMS code
    else {
      setSMSCode((prevSMSCode) => {
        const newSMSCode = prevSMSCode.substring(0, index) + value + prevSMSCode.substring(index + 1);
        return newSMSCode;
      });
    }
  };

  // useEffect to update smsCodeValid based on smsCode
  useEffect(() => {
    setIsSMSCodeValid(smsCode.length === inputRefs.length);
  }, [smsCode, setIsSMSCodeValid]);

  return (
    <View style={styles.container}>
      <View style={styles.containerUpper}>
        <Text style={styles.textMain}>Введите код из SMS</Text>
        <View style={styles.inputContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.input}
              value={smsCode[index] || ''}
              onChangeText={(text) => handleInputChange(text, index)}
              keyboardType="numeric"
              placeholder='_'
              maxLength={1}
              autoCompleteType="off"
            />
          ))}
        </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 40,
    height: 50,
    backgroundColor: 'white',
    textAlign: 'center',
    marginHorizontal: 2,
    borderRadius: 10,
    fontSize: 18,
  },
});

export default SMSCodeForm;
