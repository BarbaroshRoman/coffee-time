import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
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
import ImagePicker from 'react-native-image-crop-picker';

import {COLORS} from '../../resources/colors';
import {RegistrationTitle} from '../common/components/RegistrationTitle';
import {RegistrationContainer} from '../common/components/registrationContainer/RegistrationContainer';
import {
  registrationUserError,
  userPending,
  registrationUserSuccess,
  saveUserData,
  authorizationUserSuccess,
  authorizationUserError,
} from '../modules/redux/reducers/user/userReducer';
import {
  IUserRequest,
  UserClientRequest,
  UserRequest,
} from './api/CoffeeRequest';
import {navigationStacks} from '../navigation/components/navigationStacks';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {LoadingComponent} from '../common/components/LoadingComponent';

export const MAIN_MENU = 'MAIN_MENU';
export const REGISTRATION = 'REGISTRATION';
export const AUTHORIZATION = 'AUTHORIZATION';
export const USERDATA = 'USERDATA';

export interface IVisiblePassword {
  password: boolean;
  passwordConfirmation: boolean;
}

export const RegistrationScreen: React.FC = () => {
  const imageBackground = require('../../resources/images/registrationScreenImage.png');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const error = useTypedSelector(state => state.user.error);
  const loading = useTypedSelector(state => state.user.loading);

  const [choiceToEnter, setChoiceToEnter] = useState('main menu');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [isVisible, setIsVisible] = useState<IVisiblePassword>({
    password: true,
    passwordConfirmation: true,
  });

  const init = async () => {
    await SystemNavigationBar.setNavigationColor(
      COLORS.lightGray,
      'dark',
      'both',
    );
  };

  useEffect(() => {
    isFocus && init();
  }, [isFocus]);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const registrationMailHandler = useCallback((): string => {
    if (
      (email.length > 9 && email.toLowerCase().includes('@mail.ru')) ||
      (email.length > 9 && email.toLowerCase().includes('@gmail.com'))
    ) {
      return '';
    }
    return 'Введите свой email';
  }, [email]);

  const registrationPasswordHandler = useCallback((): string => {
    const characterCheck = !!password.match(/^[a-zA-Z0-9@.,_-]+$/);

    if (!characterCheck || password.length < 5 || password.length > 15) {
      return 'Пароль может содержать от 5 до 15 символов, только латинские буквы(a-z), цифры (0-9), а также (@ , . - _)';
    } else {
      return '';
    }
  }, [password]);

  const registrationErrorHandler = (): boolean | undefined => {
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

  const authorizationErrorHandler = (): boolean | undefined => {
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
    setUsername('');
    setAvatar('');
    setIsVisible({password: true, passwordConfirmation: true});
  };

  const registrationUser = useCallback(async (): Promise<void> => {
    const isErrorsHandled = registrationErrorHandler();
    if (isErrorsHandled) {
      const userRequest = new UserClientRequest();
      const item = {
        email: email,
        password: password,
      };

      try {
        dispatch(userPending());
        const sessionId = await userRequest.register(new UserRequest(item));
        setTimeout(() => {
          dispatch(
            registrationUserSuccess({
              sessionId: sessionId,
              email: email,
              password: password,
              isLogined: true,
            }),
          );
          setChoiceToEnter(USERDATA);
        }, 2000);
      } catch {
        setTimeout(() => {
          dispatch(registrationUserError('Ошибка регистрации'));
        }, 2000);
      } finally {
        setUsername('');
      }
    }
  }, [dispatch, email, password, passwordConfirmation]);

  const additionalRegistration = useCallback((): void => {
    if (username) {
      dispatch(userPending());
      setTimeout(() => {
        dispatch(
          saveUserData({
            avatar: avatar,
            userName: username,
          }),
        );
        navigation.navigate(navigationStacks.home as never);
        backMainMenu();
      }, 5000);
    } else {
      setErrorMessage('Поле не должно быть пустым');
    }
  }, [avatar, dispatch, navigation, username]);

  const authorizationUser = useCallback(async (): Promise<void> => {
    const isErrorsHandled = authorizationErrorHandler() ?? false;
    if (isErrorsHandled) {
      const userRequest = new UserClientRequest();
      const item: IUserRequest = {
        email: email,
        password: password,
      };

      try {
        dispatch(userPending());
        const sessionId = await userRequest.authorization(
          new UserRequest(item),
        );
        setTimeout(() => {
          dispatch(
            authorizationUserSuccess({
              sessionId: sessionId,
              email: email,
              password: password,
              isLogined: true,
            }),
          );
          navigation.navigate(navigationStacks.home as never);
          backMainMenu();
        }, 5000);
      } catch {
        setTimeout(() => {
          dispatch(authorizationUserError('Неверно введен email и/или пароль'));
        }, 2000);
      }
    }
  }, [dispatch, email, navigation, password]);

  const showError = (errorMes: string): void => {
    Alert.alert('Ошибка', errorMes, [
      {
        text: 'Ok',
      },
    ]);
  };

  const goToPickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(picture => {
      setAvatar(picture.path);
    });
  };

  if (
    loading &&
    (choiceToEnter === AUTHORIZATION || choiceToEnter === USERDATA)
  ) {
    return <LoadingComponent />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={imageBackground}
          style={styles.imageBackground}>
          <View style={styles.gradientContainer}>
            <LinearGradient
              colors={['transparent', 'rgba(205,205,205,0.6)']}
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
            avatar={avatar}
            username={username}
            setUsername={setUsername}
            loading={loading}
            additionalRegistration={additionalRegistration}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        </ImageBackground>
      </View>
    );
  }
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
