import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../resources/colors';

type Props = {
  isRegistration?: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordConfirmation?: string;
  setPasswordConfirmation?: React.Dispatch<React.SetStateAction<string>>;
  confirmation: string;
  errorHandler: () => void;
  errorMessage: string;
  backMainMenu: () => void;
};
export const Registration: React.FC<Props> = props => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmation,
    errorHandler,
    errorMessage,
    backMainMenu,
    isRegistration,
    passwordConfirmation,
    setPasswordConfirmation,
  } = props;

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
      />
      {isRegistration && (
        <TextInput
          style={styles.registrationInput}
          onChangeText={setPasswordConfirmation}
          value={passwordConfirmation}
          placeholder="Подтвердите пароль"
        />
      )}
      <Text style={styles.errorHandlerText}>{errorMessage}</Text>
      <TouchableOpacity
        style={styles.confirmationButton}
        onPress={() => errorHandler()}>
        <Text style={styles.registrationButtonText}>{confirmation}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.confirmationButton}
        onPress={() => backMainMenu()}>
        <Text style={styles.registrationButtonText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.DarkBlue,
    paddingVertical: 14,
  },
  registrationButtonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
});
