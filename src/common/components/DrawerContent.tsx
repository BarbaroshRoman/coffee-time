import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {COLORS} from '../../../resources/colors';

export const DrawerContent: React.FC = () => {
  const username = useTypedSelector(state => state.user.userName);
  const avatar = useTypedSelector(state => state.user.avatar);

  return (
    <View style={styles.customDrawerContainer}>
      {avatar ? (
        <Image source={{uri: avatar}} style={styles.image} />
      ) : (
        <View style={styles.image} />
      )}
      <Text style={styles.usernameText}>{username}</Text>
      {/*<DrawerContentScrollView {...props}>*/}
      {/*<DrawerItemList {...props} />*/}
      {/*</DrawerContentScrollView>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  customDrawerContainer: {
    flex: 1,
    backgroundColor: COLORS.silver,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  imageText: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: COLORS.grey,
    color: COLORS.white,
    fontSize: 18,
  },
  usernameText: {
    color: COLORS.white,
    fontSize: 16,
  },
  aboutMeText: {
    color: COLORS.paleGreen,
  },
});
