import React, {useCallback} from 'react';
import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {HeaderComponent} from '../common/components/HeaderComponent';
import {COLORS} from '../../resources/colors';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {ProductsListView} from '../common/components/ProductsListView';
import {removeDrink} from '../modules/redux/favorites/favoritesReducer';
import {useUnsetMutation} from './api/favoriteRequest';
import {IProductBriefInfo, IProductRequest} from '../types/productTypes';

export const FavoriteDrinksScreen: React.FC = () => {
  const image = require('../../resources/images/image_no_coffe.png');
  const drinks = useTypedSelector(state => state.favorites.drinks);
  const sessionId = useTypedSelector(state => state.user.sessionId);
  const dispatch = useDispatch();
  const [unsetFavorite] = useUnsetMutation();

  const unsetFavoriteProduct = useCallback(
    async (item: IProductBriefInfo): Promise<void> => {
      const product: IProductRequest = {
        sessionId: sessionId,
        productId: item.id,
      };
      await unsetFavorite(product)
        .unwrap()
        .then(() => {
          dispatch(removeDrink(item.id));
        })
        .catch(() => {
          showError('Попробуйте позже');
        });
    },
    [dispatch, sessionId, unsetFavorite],
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
        unsetFavoriteProduct={unsetFavoriteProduct}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      {drinks.length ? (
        <View style={styles.drinksContainer}>
          <FlatList
            data={drinks}
            renderItem={renderDrinksList}
            keyExtractor={item => item.id + item.name}
            numColumns={2}
          />
        </View>
      ) : (
        <View style={styles.emptyListContainer}>
          <Image source={image} style={styles.imageNoCoffee} />
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
  drinksContainer: {
    marginBottom: '30%',
  },
  emptyListContainer: {
    alignItems: 'center',
  },
  imageNoCoffee: {
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
