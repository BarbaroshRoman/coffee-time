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

import {useTypedSelector} from '../../hooks/useTypedSelector';
import {COLORS} from '../../../resources/colors';
import {navigationStacks} from '../../navigation/components/navigationStacks';
import {loadingUser, userLogout} from '../../modules/redux/user/userReducer';

export const CustomDrawerContent: React.FC<
  DrawerContentComponentProps
> = props => {
  const avatar = useTypedSelector(state => state.user.avatar);
  const username = useTypedSelector(state => state.user.userName);
  const dispatch = useDispatch();
  const navigation = props.navigation;

  const logOutHelper = useCallback((): void => {
    navigation.closeDrawer();
    navigation.navigate(navigationStacks.home);
    dispatch(loadingUser());
    setTimeout(() => {
      dispatch(userLogout());
      navigation.navigate(navigationStacks.registration);
    }, 2000);
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
          <Image source={{uri: avatar}} style={styles.imageNoCoffee} />
        ) : (
          <View style={styles.imageNoCoffee} />
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
  imageNoCoffee: {
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
