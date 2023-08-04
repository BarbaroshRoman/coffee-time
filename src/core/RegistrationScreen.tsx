import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
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
  loadingUser,
  registrationUser,
  saveUserData,
} from '../modules/redux/user/userReducer';
import {navigationStacks} from '../navigation/components/navigationStacks';
import {LoadingComponent} from '../common/components/LoadingComponent';
import {useAuthorizationMutation, useRegisterMutation} from './api/userRequest';
import {IUserRequest, IUserSuccessPayload} from '../types/userTypes';
import {useTypedSelector} from '../hooks/useTypedSelector';

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
  const isLoading = useTypedSelector(state => state.user.isLoading);
  const [registrationRequest] = useRegisterMutation();
  const [authorizationRequest] = useAuthorizationMutation();

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
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const registrationMailHandler = useCallback((): string => {
    const firstCheck = email.toLowerCase().includes('@');
    const secondCheck = email.toLowerCase().includes('.');

    if (firstCheck && secondCheck && email.length > 5) {
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

  const handleRegistrationUser = useCallback(async (): Promise<void> => {
    const isErrorsHandled = registrationErrorHandler();
    if (isErrorsHandled) {
      const item: IUserRequest = {
        email: email,
        password: password,
      };
      await registrationRequest(item)
        .unwrap()
        .then(sessionId => {
          const payload: IUserSuccessPayload = {
            sessionId: sessionId,
            email: email,
            password: password,
            isLogined: true,
          };
          dispatch(loadingUser());
          setTimeout(() => {
            dispatch(registrationUser(payload));
            setChoiceToEnter(USERDATA);
          }, 2000);
        })
        .catch(() => {
          showError('Ошибка регистрации');
        })
        .finally(() => {
          setUsername('');
        });
    }
  }, [dispatch, email, password, passwordConfirmation, registrationRequest]);

  const additionalRegistration = useCallback((): void => {
    if (username) {
      dispatch(loadingUser());
      setTimeout(() => {
        dispatch(
          saveUserData({
            avatar: avatar,
            userName: username,
          }),
        );
        navigation.navigate(navigationStacks.home as never);
        backMainMenu();
      }, 2000);
    } else {
      setErrorMessage('Поле не должно быть пустым');
    }
  }, [avatar, dispatch, navigation, username]);

  const handleAuthorizationUser = useCallback(async (): Promise<void> => {
    const isErrorsHandled = authorizationErrorHandler();
    if (isErrorsHandled) {
      const item: IUserRequest = {
        email: email,
        password: password,
      };
      await authorizationRequest(item)
        .unwrap()
        .then(sessionId => {
          const payload: IUserSuccessPayload = {
            sessionId: sessionId,
            email: email,
            password: password,
            isLogined: true,
          };
          dispatch(loadingUser());
          setTimeout(() => {
            dispatch(registrationUser(payload));
            navigation.navigate(navigationStacks.home as never);
            backMainMenu();
          }, 2000);
        })
        .catch(() => {
          showError('Неверно введен email и/или пароль');
        });
    }
  }, [authorizationRequest, dispatch, email, navigation, password]);

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
    isLoading &&
    (choiceToEnter === AUTHORIZATION || choiceToEnter === USERDATA)
  ) {
    return <LoadingComponent />;
  } else {
    return (
      <ImageBackground source={imageBackground} style={styles.imageBackground}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={['transparent', 'rgba(205,205,205,0.6)']}
            style={styles.gradient}
          />
        </View>
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
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
            handleRegistrationUser={handleRegistrationUser}
            handleAuthorizationUser={handleAuthorizationUser}
            goToPickImage={goToPickImage}
            avatar={avatar}
            username={username}
            setUsername={setUsername}
            isLoading={isLoading}
            additionalRegistration={additionalRegistration}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        </ScrollView>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
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
