import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS} from '../../../../resources/colors';
import {LoginMethod} from './child/LoginMethod';
import {
  AUTHORIZATION,
  REGISTRATION,
  USERNAME,
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
  registrationUser: () => void;
  authorizationUser: () => void;
  goToPickImage: () => void;
  avatar: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  selectPersonalData: () => void;
  loading: boolean;
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
    registrationUser,
    authorizationUser,
    goToPickImage,
    avatar,
    username,
    setUsername,
    selectPersonalData,
    loading,
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
          loading={loading}
          selectPersonalData={selectPersonalData}
        />
      );
    case REGISTRATION:
      return (
        <LoginMethod
          isRegistration={true}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmation={'Зарегистрироваться'}
          errorMessage={errorMessage}
          backMainMenu={backMainMenu}
          passwordConfirmation={passwordConfirmation}
          setPasswordConfirmation={setPasswordConfirmation}
          selectPersonalData={selectPersonalData}
        />
      );
    case USERNAME:
      return (
        <UserData
          registrationUser={registrationUser}
          authorizationUser={authorizationUser}
          goToPickImage={goToPickImage}
          avatar={avatar}
          username={username}
          setUsername={setUsername}
          errorMessage={errorMessage}
          loading={loading}
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
