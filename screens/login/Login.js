import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, TextInput, StyleSheet, Dimensions, Animated } from 'react-native';
import { colors } from '../../constants/colors.js';

const screenHeight = Dimensions.get('window').height;

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

export default function Login({ onLogin, baseUrl }) {
  const scrollViewRef = useRef(null);
  const [isSecondContainerVisible, setIsSecondContainerVisible] = useState(false);
  const [showInputContainer, setshowInputContainer] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const toggleLoginScreen = () => {
    setIsSecondContainerVisible(!isSecondContainerVisible);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: isSecondContainerVisible ? 0 : screenHeight,
        animated: true,
      });
    }
  };

  const showInputs = () => {
    setshowInputContainer(true);
    Animated.timing(
      fadeAnim, // The animated value to modify
      {
        toValue: 1, // Target opacity value (1 for fully opaque)
        duration: 500, // Duration of the animation in milliseconds
        useNativeDriver: true, // Use the native driver for performance
      }
    ).start(); // Start the animation
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
          <View style={styles.containerUpper}>
            <Text style={styles.textMain}>Автомойки {'\n'}рядом.</Text>
            {/* Phone Input */}
            <Pressable onPress={showInputs} style={styles.button}>
              <Text style={styles.buttonText}>Создать аккаунт</Text>
            </Pressable>
            <Animated.View 
              style={[
                styles.inputContainer, 
                { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Номер телефона"
                keyboardType="phone-pad"
                onChangeText={(text) => {}}
              />
              {/* SMS Code Input */}
              <TextInput
                style={styles.input}
                placeholder="SMS-код (6 цифр)"
                keyboardType="numeric"
                maxLength={6}
                onChangeText={(text) => {}}
              />
            </Animated.View>
          </View>
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
  },
  loginComponent: {
    height: '100%',
    flexDirection: 'column',
  },
  container: {
    height: '50%',
    flexDirection: 'column',
  },
  // firstContainer: {
  //   marginTop: '-50%',
  // },
  inputContainer: {
    width: '100%',
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
    width: '100%',
    fontSize: 34,
    textAlign: 'left',
    fontWeight: '500',
    color: colors.grey5,
  },
  textSub: {
    fontSize: 16,
    marginBottom: 12,
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
  button: {
    width: '100%',
    backgroundColor: colors.confirmBlue,
    padding: 12,
    paddingBottom: 14,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  linkText: {
    color: colors.confirmBlue
  }
});
