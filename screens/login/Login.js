import React, { useState, useRef, useEffect } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Pressable, 
  StyleSheet, 
  Dimensions, 
  Animated 
} from 'react-native';
import { colors } from '../../constants/colors.js';
import PhoneForm from './PhoneForm';

const screenHeight = Dimensions.get('window').height;

export default function Login({ onLogin, baseUrl }) {
  const scrollViewRef = useRef(null);
  const [isSecondContainerVisible, setIsSecondContainerVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [isToggled, setIsToggled] = useState(false);
  const [activeDotIndex, setActiveDotIndex] = useState(0); // Индекс активного кружка
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState();
  const [isPhoneFormValid, setIsPhoneFormValid] = useState(false);
  
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

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollContainer}
      scrollEnabled={false}
    >
      <View style={styles.loginComponent}>
        {/* First Container */}
        <View style={[styles.container, styles.firstContainer]}>
          <PhoneForm
            toggleInputs={toggleInputs}
            fadeAnim={fadeAnim}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            activeDotIndex={activeDotIndex}
            isToggled={isToggled}
            onValidationChange={setIsPhoneFormValid}
          />
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
    borderColor: 'transparent', // Initial border color
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  linkText: {
    color: colors.confirmBlue
  },
});