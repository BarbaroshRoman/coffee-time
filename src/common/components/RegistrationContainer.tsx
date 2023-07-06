import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {COLORS} from '../../../resources/colors';
import {LoginMethod} from './LoginMethod';
import {
  AUTHORIZATION,
  REGISTRATION,
  USER_NAME,
} from '../../core/RegistrationScreen';

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
  image: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  additionalRegistration: () => void;
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
    errorMessage,
    backMainMenu,
    passwordConfirmation,
    setPasswordConfirmation,
    registrationUser,
    authorizationUser,
    goToPickImage,
    image,
    username,
    setUsername,
    additionalRegistration,
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
          authorizationUser={authorizationUser}
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
          additionalRegistration={additionalRegistration}
        />
      );
    case USER_NAME:
      return (
        <>
          <View style={styles.imageContainer}>
            {image ? (
              <TouchableOpacity onPress={goToPickImage}>
                <Image source={{uri: image}} style={styles.image} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={goToPickImage}>
                <View style={styles.image}>
                  <Text style={styles.selectImageText}>Выбрать фото</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.usernameInputContainer}>
            <TextInput
              style={styles.usernameInput}
              onChangeText={setUsername}
              value={username}
              placeholder="Ваше имя"
              placeholderTextColor={COLORS.white}
            />
            <FontAwesome5 name={'user'} color={COLORS.white} />
            {/*<AntDesign name={'message1'} size={20} />*/}
          </View>
        </>
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
  imageContainer: {
    alignSelf: 'center',
    marginTop: '8%',
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  image: {
    alignSelf: 'center',
    marginTop: '3%',
    height: 110,
    width: 110,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: COLORS.white,
    backgroundColor: COLORS.grey,
  },
  selectImageText: {
    marginTop: '28%',
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center',
  },
  usernameInputContainer: {
    flexDirection: 'row',
    marginTop: '2%',
    borderBottomWidth: 1,
    borderColor: COLORS.white,
    marginHorizontal: '14%',
    fontSize: 24,
    paddingLeft: 20,
  },
  usernameInput: {
    fontSize: 20,
  },
});
