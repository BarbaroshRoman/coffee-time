import React from 'react';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../resources/colors';
import {HeaderComponent} from '../common/components/HeaderComponent';

export const FavoriteCafeScreen: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const image = require('../../resources/images/image_no_coffe.png');

  const openDrawer = (): void => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <HeaderComponent isGoBack={false} openDrawer={openDrawer} />
      <View style={styles.emptyListContainer}>
        <Image source={image} style={styles.coffeeImage} />
        <Text style={styles.errorText}>
          Вы пока что не добавили любимое кафе
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListContainer: {
    alignItems: 'center',
  },
  coffeeImage: {
    width: 180,
    height: 180,
    marginLeft: 20,
    marginTop: '22%',
  },
  errorText: {
    color: COLORS.slateGray,
    fontSize: 16,
    marginTop: '24%',
  },
});
