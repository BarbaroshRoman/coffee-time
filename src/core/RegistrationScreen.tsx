import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';

import {COLORS} from '../../resources/colors';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {RegistrationTitle} from '../common/components/RegistrationTitle';
import {RegistrationContainer} from '../common/components/RegistrationContainer';

export const RegistrationScreen: React.FC = () => {
  const imageBackground = require('../../resources/images/registrationScreenImage.png');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isFocus = useIsFocused();

  const [choiceToEnter, setChoiceToEnter] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const init = async () => {
    await SystemNavigationBar.setNavigationColor(
      COLORS.cornsilk,
      'dark',
      'both',
    );
  };

  useEffect(() => {
    isFocus && init();
  }, [isFocus]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const registrationMailHandler = useCallback(() => {
    if (
      (email.length > 9 && email.toLowerCase().includes('@mail.ru')) ||
      (email.length > 9 && email.toLowerCase().includes('@gmail.com'))
    ) {
      return '';
    }
    return 'Ошибка. Введите свой email';
  }, [email]);

  const registrationPasswordHandler = useCallback(() => {
    const characterCheck = !!password.match(/^[a-zA-Z0-9@.,_-]+$/);

    if (!characterCheck || password.length < 5 || password.length > 15) {
      return 'Пароль может содержать от 5 до 15 символов, только латинские буквы(a-z), цифры (0-9), а также (@ , . - _)';
    } else {
      return '';
    }
  }, [password]);

  const errorHandler = () => {
    const mailError = registrationMailHandler();
    const passwordError = registrationPasswordHandler();

    if (mailError) {
      setErrorMessage(mailError);
    } else if (passwordError) {
      setErrorMessage(passwordError);
    } else if (password !== passwordConfirmation) {
      setErrorMessage('Пароли не совпадают');
    } else {
      setErrorMessage('');
    }
  };

  const backMainMenu = (): void => {
    setChoiceToEnter('');
    setErrorMessage('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={imageBackground} style={styles.imageBackground}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={['transparent', 'rgba(245,255,215,0.6)']}
            style={styles.gradient}
          />
        </View>
        <RegistrationTitle fadeAnim={fadeAnim} />
        <RegistrationContainer
          fadeAnim={fadeAnim}
          choiceToEnter={choiceToEnter}
          setChoiceToEnter={setChoiceToEnter}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          passwordConfirmation={passwordConfirmation}
          setPasswordConfirmation={setPasswordConfirmation}
          errorHandler={errorHandler}
          errorMessage={errorMessage}
          backMainMenu={backMainMenu}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
});
