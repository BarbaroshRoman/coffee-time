import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import {COLORS} from '../../resources/colors';
import {RegistrationTitle} from '../common/components/RegistrationTitle';
import {RegistrationContainer} from '../common/components/RegistrationContainer';
import {
  registrationUserError,
  registrationUserPending,
  registrationUserSuccess,
} from '../modules/redux/reducers/user/userReducer';
import {UserClientRequest, UserRequest} from './api/CoffeeRequest';
import {navigationStacks} from '../navigation/stacks/navigationStacks';
import ImagePicker from 'react-native-image-crop-picker';

export const MAIN_MENU = 'main menu';
export const REGISTRATION = 'Registration';
export const AUTHORIZATION = 'Authorization';
export const USER_NAME = 'User name';

export const RegistrationScreen: React.FC = () => {
  const imageBackground = require('../../resources/images/registrationScreenImage.png');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [choiceToEnter, setChoiceToEnter] = useState('main menu');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const init = async () => {
    await SystemNavigationBar.setNavigationColor(COLORS.white, 'dark', 'both');
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
    return 'Введите свой email';
  }, [email]);

  const registrationPasswordHandler = useCallback(() => {
    const characterCheck = !!password.match(/^[a-zA-Z0-9@.,_-]+$/);

    if (!characterCheck || password.length < 5 || password.length > 15) {
      return 'Пароль может содержать от 5 до 15 символов, только латинские буквы(a-z), цифры (0-9), а также (@ , . - _)';
    } else {
      return '';
    }
  }, [password]);

  const registrationErrorHandler = () => {
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
      return true;
    }
  };

  const authorizationErrorHandler = () => {
    const mailError = registrationMailHandler();
    const passwordError = registrationPasswordHandler();

    if (mailError) {
      setErrorMessage(mailError);
    } else if (passwordError) {
      setErrorMessage(passwordError);
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const backMainMenu = (): void => {
    setChoiceToEnter(MAIN_MENU);
    setErrorMessage('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const additionalRegistration = (): void => {
    const isErrorsHandled = registrationErrorHandler() ?? false;
    if (isErrorsHandled) {
      setChoiceToEnter(USER_NAME);
    }
  };

  const registrationUser = async () => {
    const userRequest = new UserClientRequest();
    const item = {
      email: email,
      password: password,
    };

    try {
      dispatch(registrationUserPending());
      const sessionId = await userRequest.register(new UserRequest(item));
      dispatch(
        registrationUserSuccess({
          sessionId: sessionId,
          email: email,
          password: password,
        }),
      );
      navigation.navigate(navigationStacks.home as never);
      backMainMenu();
    } catch {
      dispatch(registrationUserError('Ошибка регистрации'));
    }
  };

  const authorizationUser = async () => {
    const isErrorsHandled = authorizationErrorHandler() ?? false;
    if (isErrorsHandled) {
      const userRequest = new UserClientRequest();
      const item = {
        email: email,
        password: password,
      };

      try {
        dispatch(registrationUserPending());
        const sessionId = await userRequest.authorization(
          new UserRequest(item),
        );
        dispatch(
          registrationUserSuccess({
            sessionId: sessionId,
            email: email,
            password: password,
          }),
        );
        navigation.navigate(navigationStacks.home as never);
        backMainMenu();
      } catch {
        dispatch(registrationUserError('Ошибка авторизации'));
      }
    }
  };

  const goToPickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(picture => {
      setImage(picture.path);
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={imageBackground} style={styles.imageBackground}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.6)']}
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
          errorMessage={errorMessage}
          backMainMenu={backMainMenu}
          registrationUser={registrationUser}
          authorizationUser={authorizationUser}
          goToPickImage={goToPickImage}
          image={image}
          username={username}
          setUsername={setUsername}
          additionalRegistration={additionalRegistration}
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
