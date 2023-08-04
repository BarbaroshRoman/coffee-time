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
import {PasswordInput} from '../../PasswordInput';

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
  isLoading?: boolean;
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
    isLoading,
    handleAuthorizationUser,
    handleRegistrationUser,
    isVisible,
    setIsVisible,
  } = props;

  if (isLoading && isRegistration) {
    return (
      <View style={styles.registrationLoading}>
        <Spinner type="Wave" color={COLORS.white} size={80} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.emailInput}
            onChangeText={setEmail}
            value={email}
            placeholder="Введите email"
            autoComplete={'email'}
          />
          <PasswordInput
            password={password}
            setPassword={setPassword}
            placeholder={'Введите пароль'}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
          {isRegistration && (
            <PasswordInput
              password={passwordConfirmation}
              setPassword={setPasswordConfirmation}
              placeholder={'Подтвердите пароль'}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              isRegistration={isRegistration}
            />
          )}
        </View>
        <Text style={styles.errorHandlerText}>{errorMessage}</Text>
        <TouchableOpacity
          style={styles.buttons}
          onPress={
            isRegistration ? handleRegistrationUser : handleAuthorizationUser
          }>
          <Text style={styles.buttonsText}>{confirmation}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={backMainMenu}>
          <Text style={styles.buttonsText}>Назад</Text>
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
  inputContainer: {
    alignItems: 'center',
  },
  emailInput: {
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
    marginLeft: 24,
  },
  buttons: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 14,
  },
  buttonsText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
});
