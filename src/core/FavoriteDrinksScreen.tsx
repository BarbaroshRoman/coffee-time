import React, {useCallback} from 'react';
import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {HeaderComponent} from '../common/components/HeaderComponent';
import {COLORS} from '../../resources/colors';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {ProductsListView} from '../common/components/ProductsListView';
import {navigationHomePages} from '../navigation/components/navigationHomePages';
import {
  addDrink,
  removeDrink,
} from '../modules/redux/favorites/favoritesReducer';
import {useDispatch} from 'react-redux';
import {useSetMutation, useUnsetMutation} from './api/favoriteRequest';
import {IProductBriefInfo, IProductRequest} from '../types/productTypes';

interface IFavoriteDrinksScreenProps {
  navigation: DrawerContentComponentProps['navigation'];
}

export const FavoriteDrinksScreen: React.FC<IFavoriteDrinksScreenProps> = ({
  navigation,
}) => {
  const image = require('../../resources/images/image_no_coffe.png');
  const drinks = useTypedSelector(state => state.favorites.drinks);
  const sessionId = useTypedSelector(state => state.user.sessionId);
  const dispatch = useDispatch();
  const [setFavorite] = useSetMutation();
  const [unsetFavorite] = useUnsetMutation();

  const openDrawer = (): void => {
    navigation.openDrawer();
  };

  const goToProduct = useCallback(
    (item: IProductBriefInfo): void => {
      navigation.navigate(
        navigationHomePages.productDetails as never,
        item as never,
      );
    },
    [navigation],
  );

  const setFavoriteHelper = useCallback(
    async (
      product: IProductRequest,
      item: IProductBriefInfo,
    ): Promise<void> => {
      await setFavorite(product)
        .unwrap()
        .then(response => {
          item.favorite = response;
          dispatch(addDrink(item));
        })
        .catch(() => {
          showError('Попробуйте позже');
        });
    },
    [dispatch, setFavorite],
  );

  const unsetFavoriteHelper = useCallback(
    async (
      product: IProductRequest,
      item: IProductBriefInfo,
    ): Promise<void> => {
      await unsetFavorite(product)
        .unwrap()
        .then(response => {
          item.favorite = response;
          dispatch(removeDrink(item.id));
        })
        .catch(() => {
          showError('Попробуйте позже');
        });
    },
    [dispatch, unsetFavorite],
  );

  const setAndUnsetFavoriteProduct = useCallback(
    async (item: IProductBriefInfo, method: string): Promise<void> => {
      const product: IProductRequest = {
        sessionId: sessionId,
        productId: item.id,
      };
      if (method === 'set') {
        await setFavoriteHelper(product, item);
      } else if (method === 'unset') {
        await unsetFavoriteHelper(product, item);
      }
    },
    [sessionId],
  );

  const showError = (errorMes: string): void => {
    Alert.alert('Ошибка', errorMes, [
      {
        text: 'Ok',
      },
    ]);
  };

  const renderDrinksList = ({item}: {item: IProductBriefInfo}) => {
    return (
      <ProductsListView
        item={item}
        goToProduct={goToProduct}
        setAndUnsetFavoriteProduct={setAndUnsetFavoriteProduct}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComponent isGoBack={false} openDrawer={openDrawer} />
      {drinks.length ? (
        <FlatList
          data={drinks}
          renderItem={renderDrinksList}
          keyExtractor={item => item.id + item.name}
          numColumns={2}
        />
      ) : (
        <View style={styles.emptyListContainer}>
          <Image source={image} style={styles.coffeeImage} />
          <Text style={styles.errorText}>
            Вы пока что не добавили любимые напитки
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
