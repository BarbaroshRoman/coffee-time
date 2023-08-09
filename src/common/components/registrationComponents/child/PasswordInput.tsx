import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {COLORS} from '../../../../../resources/colors';
import {IVisiblePassword} from '../../../../core/RegistrationScreen';

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

  const hiddenPassword = useMemo(
    (): boolean =>
      isRegistration ? isVisible.passwordConfirmation : isVisible.password,
    [isRegistration, isVisible.password, isVisible.passwordConfirmation],
  );

  const changePasswordVisibility = useCallback(() => {
    isRegistration
      ? setIsVisible({
          ...isVisible,
          passwordConfirmation: !isVisible.passwordConfirmation,
        })
      : setIsVisible({...isVisible, password: !isVisible.password});
  }, [isRegistration, isVisible, setIsVisible]);

  const iconName = useMemo(
    () =>
      isVisible[isRegistration ? 'passwordConfirmation' : 'password']
        ? 'eye'
        : 'eye-slash',
    [isRegistration, isVisible],
  );

  const iconColor = useMemo(
    () =>
      isVisible[isRegistration ? 'passwordConfirmation' : 'password']
        ? COLORS.ghostWhite
        : COLORS.dimGray,
    [isRegistration, isVisible],
  );

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.passwordInput}
        onChangeText={setPassword}
        value={password}
        placeholder={placeholder}
        secureTextEntry={hiddenPassword}
      />
      <TouchableOpacity
        style={styles.visibilityIconButton}
        onPress={changePasswordVisibility}>
        <FontAwesome5
          name={iconName}
          style={styles.icon}
          size={16}
          color={iconColor}
        />
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
