import React, {useCallback, useEffect, useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

import {COLORS} from '../../../resources/colors';
import {IProductBriefInfo} from '../../types/productTypes';
import {navigationHomePages} from '../../navigation/components/navigationHomePages';

type Props = {
  item: IProductBriefInfo;
  isCafeDetailsScreen?: boolean;
  setAndUnsetFavoriteProduct?: (
    item: IProductBriefInfo,
    method: string,
  ) => void;
  unsetFavoriteProduct?: (item: IProductBriefInfo) => void;
  getAllProduct?: () => Promise<void>;
  favoriteDrinks?: IProductBriefInfo[];
};
export const ProductsListView: React.FC<Props> = props => {
  const navigation =
    useNavigation() as DrawerContentComponentProps['navigation'];
  const {
    item,
    setAndUnsetFavoriteProduct,
    unsetFavoriteProduct,
    getAllProduct,
    favoriteDrinks,
    isCafeDetailsScreen,
  } = props;

  useEffect(() => {
    if (isCafeDetailsScreen) {
      const targetDrink = favoriteDrinks?.find(el => el.id === item.id);
      if (targetDrink?.favorite !== item.favorite) {
        getAllProduct?.();
      }
    }
  }, [
    favoriteDrinks,
    getAllProduct,
    isCafeDetailsScreen,
    item.favorite,
    item.id,
  ]);

  const goToProduct = useCallback(
    (product: IProductBriefInfo): void => {
      navigation.navigate(navigationHomePages.productDetails, product);
    },
    [navigation],
  );

  const changeFavoritesProduct = useCallback(() => {
    if (setAndUnsetFavoriteProduct) {
      item.favorite
        ? setAndUnsetFavoriteProduct(item, 'unset')
        : setAndUnsetFavoriteProduct(item, 'set');
    } else if (unsetFavoriteProduct) {
      unsetFavoriteProduct(item);
    }
  }, [item, setAndUnsetFavoriteProduct, unsetFavoriteProduct]);

  const favoritesIcon = useMemo(
    () => (item.favorite ? 'heart' : 'hearto'),
    [item.favorite],
  );

  const favoritesIconColor = useMemo(
    () => (item.favorite ? COLORS.red : COLORS.ghostWhite),
    [item.favorite],
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => goToProduct(item)}>
      <Text style={styles.name}>{item.name}</Text>
      <Image source={{uri: item.imagesPath}} style={styles.imageNoCoffee} />
      <View style={styles.iconBox}>
        <Text style={styles.price}>{item.price} ₽</Text>
        <TouchableOpacity onPress={changeFavoritesProduct}>
          <AntDesign
            name={favoritesIcon}
            color={favoritesIconColor}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
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
  imageNoCoffee: {
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
  iconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
});
