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
import ProgressDots from '../shared/ProgressDots.js';
import SMSCodeForm from './SMSCodeForm.js';
import PasswordForm from './PasswordForm.js';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').height;
 
export default function Login({ onLogin, baseUrl }) {
  const scrollViewRef = useRef(null);
  const [isSecondContainerVisible, setIsSecondContainerVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current; // New Animated.Value for containerOffset
  const [containerOffset, setContainerOffset] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState();
  const [isPhoneFormValid, setIsPhoneFormValid] = useState(false);

  const [smsCode, setSMSCode] = useState('');
  const [isSMSCodeValid, setIsSMSCodeValid] = useState(false);

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState('');

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

  const confirmPassword = () => {
    console.log("HELLO WORLD");
  };

  const confirmPhoneNumber = () => {
    const newContainerOffset = containerOffset + 1;
    const toValue = -0.5 * (newContainerOffset * screenWidth) + (24 * newContainerOffset); // Considering 24 pixels padding on each side
  
    Animated.timing(
      offsetAnim,
      {
        toValue,
        duration: 450,
        useNativeDriver: true,
      }
    ).start();
    
    setContainerOffset(newContainerOffset);
    setCurrentFormIndex(currentFormIndex + 1);
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
        <View style={[styles.container]}>
        <Animated.View style={[
          {
            transform: [{
              translateX: offsetAnim
            }]
          }, 
          styles.formContainer
        ]}>
        {/* <View style={[{ right: containerOffset}, styles.formContainer]}> */}
            <View style={styles.phoneForm}>
              <PhoneForm
                toggleInputs={toggleInputs}
                fadeAnim={fadeAnim}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                isToggled={isToggled}
                onValidationChange={setIsPhoneFormValid}
              />
            </View>
            <View style={styles.phoneForm}>
              <SMSCodeForm
                fadeAnim={fadeAnim}
                smsCode={smsCode}
                setSMSCode={setSMSCode}
                setIsSMSCodeValid={setIsSMSCodeValid}
              />
            </View>
            <View style={styles.phoneForm}>
              <PasswordForm
                password={password}
                repeatPassword={repeatPassword}
                setPassword={setPassword}
                setRepeatPassword={setRepeatPassword}
                setIsPasswordValid={setIsPasswordValid}
              />
            </View>
          </Animated.View>
          <Animated.View style={{ opacity: fadeAnim }}>
            <ProgressDots style={styles.progressDots} numDots={3} activeDotIndex={currentFormIndex} />
            {currentFormIndex === 0 ? (
              <Pressable 
                style={[
                  styles.button,
                  styles.btnContinue,
                  { backgroundColor: isPhoneFormValid ? colors.confirmGreen : colors.grey4 }
                ]} 
                disabled={!isPhoneFormValid}
                onPress={confirmPhoneNumber}
              >
                <Text style={styles.buttonText}>Отправить SMS-код</Text>
              </Pressable>
            ) : currentFormIndex === 1 ? (
              <Pressable 
                style={[
                  styles.button,
                  styles.btnContinue,
                  { backgroundColor: isSMSCodeValid ? colors.confirmGreen : colors.grey4 }
                ]} 
                disabled={!isSMSCodeValid}
                onPress={confirmPhoneNumber}
              >
                <Text style={styles.buttonText}>Проверить код</Text>
              </Pressable>
            ) : (
              <Pressable 
                style={[
                  styles.button,
                  styles.btnContinue,
                  { backgroundColor: isPasswordValid ? colors.confirmGreen : colors.grey4 }
                ]} 
                disabled={!isPasswordValid}
                onPress={confirmPassword}
              >
                <Text style={styles.buttonText}>Подтвердить пароль</Text>
              </Pressable>
            )}
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
  btnContinue: {
    width: '100% - 12',
    marginHorizontal: 24,
    marginVertical: 4
  },
  formContainer: {
    flex: 1,
    position: 'relative',
    justifyContent:'flex-start',
    flexDirection: 'row',
    width: '300%'
  },
  phoneForm: {
    flex: 1,
    width: '25%',
  }
});
