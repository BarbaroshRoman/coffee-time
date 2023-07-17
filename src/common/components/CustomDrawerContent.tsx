import React, {useCallback} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {useTypedSelector} from '../../hooks/useTypedSelector';
import {COLORS} from '../../../resources/colors';
import {registrationUserSuccess} from '../../modules/redux/reducers/user/userReducer';
import {navigationStacks} from '../../navigation/components/navigationStacks';

export const CustomDrawerContent: React.FC<
  DrawerContentComponentProps
> = props => {
  const avatar = useTypedSelector(state => state.user.avatar);
  const username = useTypedSelector(state => state.user.userName);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logOutHelper = useCallback((): void => {
    dispatch(
      registrationUserSuccess({
        userName: '',
        avatar: '',
        isLogined: false,
        password: '',
        email: '',
        sessionId: '',
      }),
    );
    navigation.navigate(navigationStacks.registration as never);
  }, [dispatch, navigation]);

  const logOut = () =>
    Alert.alert('Выйти из учетной записи', 'Вы точно хотите выйти?', [
      {
        text: 'Отмена',
      },
      {
        text: 'выйти',
        onPress: logOutHelper,
      },
    ]);

  return (
    <View style={styles.customDrawerContainer}>
      <View style={styles.headerContainer}>
        {avatar ? (
          <Image source={{uri: avatar}} style={styles.image} />
        ) : (
          <View style={styles.image} />
        )}
        <Text style={styles.usernameText}>{username}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.footerContainer} onPress={logOut}>
        <Text style={styles.logOutText}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customDrawerContainer: {
    flex: 1,
    backgroundColor: COLORS.dimGray,
  },
  headerContainer: {
    padding: 30,
    alignItems: 'center',
  },
  image: {
    backgroundColor: COLORS.ghostWhite,
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  usernameText: {
    color: COLORS.white,
    fontSize: 18,
  },
  footerContainer: {
    paddingVertical: 18,
    paddingLeft: 24,
    borderTopWidth: 0.5,
    borderRadius: 20,
    borderColor: COLORS.ghostWhite,
  },
  logOutText: {
    color: COLORS.silver,
  },
});
