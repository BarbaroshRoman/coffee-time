import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {COLORS} from '../../../../../resources/colors';

type Props = {
  goToPickImage: () => void;
  avatar: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  additionalRegistration: () => void;
};
export const UserData = (props: Props) => {
  const {
    setUsername,
    username,
    avatar,
    goToPickImage,
    errorMessage,
    additionalRegistration,
  } = props;

  return (
    <>
      <View style={styles.imageContainer}>
        {avatar ? (
          <TouchableOpacity onPress={goToPickImage}>
            <Image source={{uri: avatar}} style={styles.image} />
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
        <FontAwesome5
          name={'pencil-alt'}
          color={COLORS.white}
          size={20}
          style={styles.pencilIcon}
        />
      </View>
      <Text style={styles.errorMessageText}>{errorMessage}</Text>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={additionalRegistration}>
        <Text style={styles.confirmText}>далее</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    fontSize: 20,
    color: COLORS.white,
  },
  pencilIcon: {
    alignSelf: 'center',
  },
  errorMessageText: {
    alignSelf: 'center',
    color: COLORS.red,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: COLORS.paleGreen,
    alignSelf: 'center',
    marginTop: '10%',
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  confirmText: {
    color: COLORS.white,
    fontSize: 20,
  },
});
