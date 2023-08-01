import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-spinkit';

import {COLORS} from '../../../../../resources/colors';
import {IVisiblePassword} from '../../../../core/RegistrationScreen';
import {InputContainer} from '../../InputContainer';

type Props = {
  isRegistration?: boolean;
  handleRegistrationUser?: () => Promise<void>;
  handleAuthorizationUser?: () => Promise<void>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordConfirmation?: string;
  setPasswordConfirmation?: React.Dispatch<React.SetStateAction<string>>;
  confirmation: string;
  errorMessage: string;
  backMainMenu: () => void;
  isRegLoading?: boolean;
  isVisible: IVisiblePassword;
  setIsVisible: React.Dispatch<React.SetStateAction<IVisiblePassword>>;
};
export const LoginMethod = (props: Props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmation,
    errorMessage,
    backMainMenu,
    isRegistration,
    passwordConfirmation,
    setPasswordConfirmation,
    isRegLoading,
    handleAuthorizationUser,
    handleRegistrationUser,
    isVisible,
    setIsVisible,
  } = props;

  if (isRegLoading && isRegistration) {
    return (
      <View style={styles.registrationLoading}>
        <Spinner type="Wave" color={COLORS.white} size={80} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.registrationInput, {marginLeft: 4}]}
          onChangeText={setEmail}
          value={email}
          placeholder="Введите email"
          autoComplete={'email'}
        />
        <InputContainer
          password={password}
          setPassword={setPassword}
          placeholder={'Введите пароль'}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
        {isRegistration && (
          <InputContainer
            password={passwordConfirmation}
            setPassword={setPasswordConfirmation}
            placeholder={'Подтвердите пароль'}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            isRegistration={isRegistration}
          />
        )}
        <Text style={styles.errorHandlerText}>{errorMessage}</Text>
        <TouchableOpacity
          style={styles.confirmationButton}
          onPress={
            isRegistration ? handleRegistrationUser : handleAuthorizationUser
          }>
          <Text style={styles.registrationButtonText}>{confirmation}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmationButton}
          onPress={backMainMenu}>
          <Text style={styles.registrationButtonText}>Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  registrationLoading: {
    marginTop: '40%',
    alignSelf: 'center',
  },
  container: {
    marginTop: '4%',
    marginHorizontal: '12%',
  },
  registrationInput: {
    paddingVertical: 8,
    width: 270,
    marginTop: 18,
    borderRadius: 8,
    paddingLeft: 8,
    backgroundColor: COLORS.white,
    fontSize: 18,
    color: COLORS.black,
  },
  errorHandlerText: {
    color: COLORS.red,
    fontSize: 16,
  },
  confirmationButton: {
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 14,
  },
  registrationButtonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
});
