import React from 'react';
import {IProductBriefInfo} from '../../core/api/CoffeeRequest';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../resources/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  item: IProductBriefInfo;
};
export const ProductsListView = (props: Props) => {
  const item = props.item;
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Image source={{uri: item.imagesPath}} style={styles.image} />
      <View style={styles.bottomContainer}>
        <Text style={styles.price}>{item.price} ₽</Text>
        <AntDesign name={'hearto'} color={COLORS.ghostWhite} size={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 176,
    backgroundColor: COLORS.white,
    elevation: 2,
    marginHorizontal: 2,
    marginVertical: 4,
  },
  name: {
    color: COLORS.dimGray,
    fontSize: 20,
    paddingLeft: 6,
    height: 60,
    textAlignVertical: 'center',
    fontFamily: 'Lobster-Regular',
  },
  image: {
    width: '100%',
    height: 150,
  },
  price: {
    flex: 1,
    color: COLORS.paleGreen,
    fontSize: 24,
    textAlignVertical: 'bottom',
    paddingVertical: 10,
    paddingLeft: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
});
