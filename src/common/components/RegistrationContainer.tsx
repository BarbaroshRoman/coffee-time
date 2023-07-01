import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../resources/colors';
import {Registration} from './Registration';

const REGISTRATION = 'Registration';
const AUTHORIZATION = 'Authorization';

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
  errorHandler: () => void;
  errorMessage: string;
  backMainMenu: () => void;
};
export const RegistrationContainer: React.FC<Props> = props => {
  const {
    fadeAnim,
    choiceToEnter,
    setChoiceToEnter,
    email,
    setEmail,
    password,
    setPassword,
    errorHandler,
    errorMessage,
    backMainMenu,
    passwordConfirmation,
    setPasswordConfirmation,
  } = props;

  switch (choiceToEnter) {
    case AUTHORIZATION:
      return (
        <Registration
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmation={'Авторизоваться'}
          errorHandler={errorHandler}
          errorMessage={errorMessage}
          backMainMenu={backMainMenu}
        />
      );
    case REGISTRATION:
      return (
        <Registration
          isRegistration={true}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmation={'Зарегистрироваться'}
          errorHandler={errorHandler}
          errorMessage={errorMessage}
          backMainMenu={backMainMenu}
          passwordConfirmation={passwordConfirmation}
          setPasswordConfirmation={setPasswordConfirmation}
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
    backgroundColor: COLORS.DarkBlue,
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
