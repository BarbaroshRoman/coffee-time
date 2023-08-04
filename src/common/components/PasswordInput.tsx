import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {COLORS} from '../../../resources/colors';
import {IVisiblePassword} from '../../core/RegistrationScreen';

type Props = {
  password: string | undefined;
  setPassword: React.Dispatch<React.SetStateAction<string>> | undefined;
  placeholder: string;
  isVisible: IVisiblePassword;
  setIsVisible: React.Dispatch<React.SetStateAction<IVisiblePassword>>;
  isRegistration?: boolean;
};
export const PasswordInput = (props: Props) => {
  const {
    isVisible,
    setIsVisible,
    setPassword,
    password,
    placeholder,
    isRegistration,
  } = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.passwordInput}
        onChangeText={setPassword}
        value={password}
        placeholder={placeholder}
        secureTextEntry={
          isRegistration ? isVisible.passwordConfirmation : isVisible.password
        }
      />
      <TouchableOpacity
        style={styles.visibilityIconButton}
        onPress={() =>
          isRegistration
            ? setIsVisible({
                ...isVisible,
                passwordConfirmation: !isVisible.passwordConfirmation,
              })
            : setIsVisible({...isVisible, password: !isVisible.password})
        }>
        {isRegistration ? (
          <FontAwesome5
            name={isVisible.passwordConfirmation ? 'eye' : 'eye-slash'}
            style={styles.icon}
            size={16}
            color={
              isVisible.passwordConfirmation
                ? COLORS.ghostWhite
                : COLORS.dimGray
            }
          />
        ) : (
          <FontAwesome5
            name={isVisible.password ? 'eye' : 'eye-slash'}
            style={styles.icon}
            size={16}
            color={isVisible.password ? COLORS.ghostWhite : COLORS.dimGray}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  passwordInput: {
    paddingVertical: 8,
    width: 270,
    marginTop: 18,
    borderRadius: 8,
    paddingLeft: 8,
    backgroundColor: COLORS.white,
    fontSize: 18,
    color: COLORS.black,
  },
  visibilityIconButton: {
    position: 'absolute',
  },
  icon: {
    paddingTop: 16,
    paddingRight: 6,
  },
});
