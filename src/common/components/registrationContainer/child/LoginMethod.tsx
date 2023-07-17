import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {COLORS} from '../../../../../resources/colors';
import Spinner from 'react-native-spinkit';

type Props = {
  isRegistration?: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordConfirmation?: string;
  setPasswordConfirmation?: React.Dispatch<React.SetStateAction<string>>;
  confirmation: string;
  errorMessage: string;
  backMainMenu: () => void;
  selectPersonalData: () => void;
  loading?: boolean;
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
    selectPersonalData,
    loading,
  } = props;

  if (loading) {
    return (
      <View style={styles.loading}>
        <Spinner type="Wave" color={COLORS.white} size={80} />
      </View>
    );
  } else {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.registrationInput}
          onChangeText={setEmail}
          value={email}
          placeholder="Введите email"
          autoComplete={'email'}
        />
        <TextInput
          style={styles.registrationInput}
          onChangeText={setPassword}
          value={password}
          placeholder="Введите пароль"
          secureTextEntry={true}
        />
        {isRegistration && (
          <TextInput
            style={styles.registrationInput}
            onChangeText={setPasswordConfirmation}
            value={passwordConfirmation}
            placeholder="Подтвердите пароль"
            secureTextEntry={true}
          />
        )}
        <Text style={styles.errorHandlerText}>{errorMessage}</Text>
        <TouchableOpacity
          style={styles.confirmationButton}
          onPress={selectPersonalData}>
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
  loading: {
    marginTop: '40%',
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: '4%',
    marginHorizontal: '12%',
  },
  registrationInput: {
    paddingVertical: 8,
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
