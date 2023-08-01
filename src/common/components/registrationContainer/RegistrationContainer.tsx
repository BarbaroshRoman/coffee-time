import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS} from '../../../../resources/colors';
import {LoginMethod} from './child/LoginMethod';
import {
  AUTHORIZATION,
  IVisiblePassword,
  REGISTRATION,
  USERDATA,
} from '../../../core/RegistrationScreen';
import {UserData} from './child/UserData';

type Props = {
  fadeAnim: any;
  choiceToEnter: string;
  setChoiceToEnter: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordConfirmation: string;
  setPasswordConfirmation: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  backMainMenu: () => void;
  handleRegistrationUser: () => Promise<void>;
  handleAuthorizationUser: () => Promise<void>;
  goToPickImage: () => void;
  avatar: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  isRegLoading: boolean;
  additionalRegistration: () => void;
  isVisible: IVisiblePassword;
  setIsVisible: React.Dispatch<React.SetStateAction<IVisiblePassword>>;
};
export const RegistrationContainer = (props: Props) => {
  const {
    fadeAnim,
    choiceToEnter,
    setChoiceToEnter,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    backMainMenu,
    passwordConfirmation,
    setPasswordConfirmation,
    handleRegistrationUser,
    handleAuthorizationUser,
    goToPickImage,
    avatar,
    username,
    setUsername,
    isRegLoading,
    additionalRegistration,
    isVisible,
    setIsVisible,
  } = props;

  switch (choiceToEnter) {
    case AUTHORIZATION:
      return (
        <LoginMethod
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmation={'Авторизоваться'}
          errorMessage={errorMessage}
          backMainMenu={backMainMenu}
          handleAuthorizationUser={handleAuthorizationUser}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      );
    case REGISTRATION:
      return (
        <LoginMethod
          isRegistration={true}
          handleRegistrationUser={handleRegistrationUser}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmation={'Зарегистрироваться'}
          errorMessage={errorMessage}
          backMainMenu={backMainMenu}
          passwordConfirmation={passwordConfirmation}
          setPasswordConfirmation={setPasswordConfirmation}
          isRegLoading={isRegLoading}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      );
    case USERDATA:
      return (
        <UserData
          goToPickImage={goToPickImage}
          avatar={avatar}
          username={username}
          setUsername={setUsername}
          errorMessage={errorMessage}
          additionalRegistration={additionalRegistration}
        />
      );
    default:
      return (
        <View style={styles.buttonsContainer}>
          <Animated.View style={{opacity: fadeAnim}}>
            <TouchableOpacity
              style={styles.registrationButton}
              onPress={() => setChoiceToEnter(AUTHORIZATION)}>
              <Text style={styles.registrationButtonText}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registrationButton}
              onPress={() => setChoiceToEnter(REGISTRATION)}>
              <Text style={styles.registrationButtonText}>Регистрация</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: '16%',
  },
  registrationButton: {
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 14,
    marginHorizontal: '10%',
    marginTop: 44,
    borderRadius: 40,
  },
  registrationButtonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
});
