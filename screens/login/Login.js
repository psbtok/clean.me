import React, { useState, useRef, useEffect } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Pressable, 
  TextInput, 
  StyleSheet, 
  Dimensions, 
  Animated 
} from 'react-native';
import { colors } from '../../constants/colors.js';
import ProgressDots from '../shared/ProgressDots.js';
import CustomPhoneInput from '../shared/PhoneInput.js';

const screenHeight = Dimensions.get('window').height;

export default function Login({ onLogin, baseUrl }) {
  const scrollViewRef = useRef(null);
  const [isSecondContainerVisible, setIsSecondContainerVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [isToggled, setIsToggled] = useState(false);
  const [activeDotIndex, setActiveDotIndex] = useState(0); // Индекс активного кружка
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  
  const toggleLoginScreen = () => {
    hidenInputs();
    setIsSecondContainerVisible(!isSecondContainerVisible);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: isSecondContainerVisible ? 0 : screenHeight,
        animated: true,
      });
    }
  };

  const toggleInputs = () => {
    setIsToggled(!isToggled);
    const toValue = fadeAnim._value === 0 ? 1 : 0; // Toggle fadeAnim value between 0 and 1
    Animated.timing(
      fadeAnim,
      {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }
    ).start();
  }; 

  const hidenInputs = () => {
    setIsToggled(false);
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }
    ).start();
  }; 

  const validatePhoneNumber = (inputNumber) => {
    const phonePattern = /^\+7\(\d{3}\)\s\d{2}-\d{2}-\d{3}$/;
    const isValid = phonePattern.test(inputNumber);
    setIsValidPhoneNumber(isValid);
  };

  const handlePhoneNumberChange = (text) => {
    const formattedNumber = text.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{2})(\d{2})(\d{3})/, '+7($1) $2-$3-$4');
    setPhoneNumber(formattedNumber);
    validatePhoneNumber(formattedNumber);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollContainer}
      scrollEnabled={false}
    >
      <View style={styles.loginComponent}>
        {/* First Container */}
        <View style={[
          styles.container, 
          styles.firstContainer,
        ]}>
          <Animated.View 
          style={[
            styles.containerUpper, 
            {
              transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -0.1 * screenHeight] // Adjust the percentage as needed (e.g., 20%)
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
                backgroundColor: isToggled ? 'black' : colors.confirmBlue, // Change background color when toggled
                borderColor: isToggled ? 'white' : 'transparent', // Change border color when toggled
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
                isValidPhoneNumber={isValidPhoneNumber}
              />
              <View>
                <ProgressDots style={styles.progressDots} numDots={2} activeDotIndex={activeDotIndex} />
                <Pressable style={[
                  styles.button,
                  styles.btnContinue,
                  { backgroundColor: isValidPhoneNumber ? colors.confirmGreen : colors.grey4 } // Change button color based on phone number validity
                ]} disabled={!isValidPhoneNumber}>
                  <Text style={styles.buttonText}>Продолжить</Text>
                </Pressable>
              </View>
            </Animated.View>
          </Animated.View>
          <View style={styles.containerLower}>
            <Text style={styles.textSub}>Уже есть аккаунт? </Text>
            <Pressable onPress={toggleLoginScreen}>
              <Text style={[styles.textSub, styles.linkText]}>Войти</Text>
            </Pressable>
          </View>
        </View>  
        <View style={styles.container}>
          <View style={styles.containerUpper}>
            <Text style={styles.textMain}>Вход</Text>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Создать аккаунт</Text>
            </Pressable>
          </View>
          <View style={styles.containerLower}>
            <Text style={styles.textSub}>Еще нет аккаунта? </Text>
            <Pressable onPress={toggleLoginScreen}>
              <Text style={[styles.textSub, styles.linkText]}>Регистрация</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: 'center',
    height: '200%',
    backgroundColor: colors.black,
  },
  loginComponent: {
    height: '100%',
    flexDirection: 'column',
  },
  container: {
    height: '50%',
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
    paddingTop: '60%',
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
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: colors.grey5,
    marginBottom: 4,
  },
  button: {
    width: '100%',
    backgroundColor: colors.confirmBlue,
    padding: 12,
    paddingBottom: 14,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent', // Initial border color
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
