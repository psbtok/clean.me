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

const screenHeight = Dimensions.get('window').height;

export default function Login({ onLogin, baseUrl }) {
  const scrollViewRef = useRef(null);
  const [isSecondContainerVisible, setIsSecondContainerVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [isToggled, setIsToggled] = useState(false);

  const toggleLoginScreen = () => {
    hidenInputs()
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
              <View>
                <Text style={styles.inputLabel}>Как к Вам обращаться?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ваше имя"
                  keyboardType="phone-pad"
                  onChangeText={(text) => {}}
                />
                <Text style={styles.inputLabel}>Номер телефона</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+7(XXX) XX-XX-XXX"
                  keyboardType="phone-pad"
                  onChangeText={(text) => {}}
                />
                {/* SMS Code Input */}
                {/* <TextInput
                  style={styles.input}
                  placeholder="SMS-код (6 цифр)"
                  keyboardType="numeric"
                  maxLength={6}
                  onChangeText={(text) => {}}
                /> */}
              </View>
              <Pressable style={[styles.button, styles.btnContinue]}>
                <Text style={styles.buttonText}>Продолжить</Text>
              </Pressable>
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
  }
});
