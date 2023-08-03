import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {COLORS} from '../../../resources/colors';
import {IProductBriefInfo} from '../../types/productTypes';

type Props = {
  item: IProductBriefInfo;
  goToProduct: (item: IProductBriefInfo) => void;
  setAndUnsetFavoriteProduct: (item: IProductBriefInfo, method: string) => void;
  getAllProduct?: () => Promise<void>;
  favoriteDrinks?: IProductBriefInfo[];
  isCafeDetailsScreen?: boolean;
};
export const ProductsListView = (props: Props) => {
  const {
    item,
    goToProduct,
    setAndUnsetFavoriteProduct,
    getAllProduct,
    favoriteDrinks,
    isCafeDetailsScreen,
  } = props;

  useEffect(() => {
    const targetDrink = favoriteDrinks?.find(el => el.id === item.id);
    if (isCafeDetailsScreen && targetDrink?.favorite !== item.favorite) {
      getAllProduct?.();
    }
  }, [favoriteDrinks, isCafeDetailsScreen, item.favorite, item.id]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => goToProduct(item)}>
      <Text style={styles.name}>{item.name}</Text>
      <Image source={{uri: item.imagesPath}} style={styles.coffeeImage} />
      <View style={styles.bottomContainer}>
        <Text style={styles.price}>{item.price} ₽</Text>
        <TouchableOpacity
          onPress={() => {
            item.favorite
              ? setAndUnsetFavoriteProduct(item, 'unset')
              : setAndUnsetFavoriteProduct(item, 'set');
          }}>
          <AntDesign
            name={item.favorite ? 'heart' : 'hearto'}
            color={item.favorite ? COLORS.red : COLORS.ghostWhite}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
  coffeeImage: {
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
