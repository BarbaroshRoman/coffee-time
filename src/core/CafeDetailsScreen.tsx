import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';

import {COLORS} from '../../resources/colors';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {ProductsListView} from '../common/components/ProductsListView';
import {DetailsContainer} from '../common/components/cafeDetailsComponent/DetailsContainer';
import {HeaderComponent} from '../common/components/HeaderComponent';
import {
  addCafe,
  addDrink,
  removeCafe,
  removeDrink,
} from '../modules/redux/favorites/favoritesReducer';
import {INewCafeInfo} from '../common/helpers/replaceCafeList';
import {IProductBriefInfo, IProductRequest} from '../types/productTypes';
import {useGetProductsCafeMutation} from './api/productRequest';
import {ICafeRequest} from '../types/cafeTypes';
import {useSetMutation, useUnsetMutation} from './api/favoriteRequest';

export const CafeDetailsScreen: React.FC = () => {
  const image = require('../../resources/images/image_no_coffe.png');
  const route = useRoute<RouteProp<Record<string, INewCafeInfo>, string>>();
  const dispatch = useDispatch();
  const sessionId = useTypedSelector(state => state.user.sessionId);
  const favoriteDrinks = useTypedSelector(state => state.favorites.drinks);
  const favoritesCafeList = useTypedSelector(state => state.favorites.cafe);
  const [getProductsCafe] = useGetProductsCafeMutation();
  const [setFavorite] = useSetMutation();
  const [unsetFavorite] = useUnsetMutation();

  const [productsList, setProductsList] = useState<IProductBriefInfo[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const targetCafe = favoritesCafeList.find(el => el.id === route.params.id);

  const getAllProduct = useCallback(async (): Promise<void> => {
    const cafe: ICafeRequest = {
      sessionId: sessionId,
      cafeId: route.params.id,
    };
    await getProductsCafe(cafe)
      .unwrap()
      .then(response => {
        setProductsList(response);
      })
      .catch(() => {
        setErrorMessages([
          'Здесь нет ни одной чашки кофе',
          'Попробуйте вернуться к нам позже',
        ]);
      });
  }, [getProductsCafe, route.params.id, sessionId]);

  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);

  const setFavoriteHelper = useCallback(
    async (
      product: IProductRequest,
      item: IProductBriefInfo,
    ): Promise<void> => {
      await setFavorite(product)
        .unwrap()
        .then(() => {
          const newItem = {...item};
          newItem.favorite = true;
          dispatch(addDrink(newItem));
        })
        .catch(() => {
          showError('Попробуйте позже');
        })
        .finally(() => {
          getAllProduct();
        });
    },
    [dispatch, getAllProduct, setFavorite],
  );

  const unsetFavoriteHelper = useCallback(
    async (
      product: IProductRequest,
      item: IProductBriefInfo,
    ): Promise<void> => {
      await unsetFavorite(product)
        .unwrap()
        .then(() => {
          dispatch(removeDrink(item.id));
        })
        .catch(() => {
          showError('Попробуйте позже');
        })
        .finally(() => {
          getAllProduct();
        });
    },
    [dispatch, getAllProduct, unsetFavorite],
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
    [sessionId, setFavoriteHelper, unsetFavoriteHelper],
  );

  const showError = (errorMes: string): void => {
    Alert.alert('Ошибка', errorMes, [
      {
        text: 'Ok',
      },
    ]);
  };

  const addCafeToFavorites = useCallback((): void => {
    if (targetCafe?.favorite) {
      dispatch(removeCafe(route.params.id));
    } else {
      dispatch(addCafe(route.params));
    }
  }, [dispatch, route.params, targetCafe?.favorite]);

  const renderProductsList = ({item}: {item: IProductBriefInfo}) => {
    return (
      <ProductsListView
        item={item}
        setAndUnsetFavoriteProduct={setAndUnsetFavoriteProduct}
        favoriteDrinks={favoriteDrinks}
        getAllProduct={getAllProduct}
        isCafeDetailsScreen={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComponent isGoBack={true} />
      {productsList.length ? (
        <>
          <View style={styles.imageBackgroundContainer}>
            <ImageBackground
              source={{uri: route.params.images}}
              style={styles.imageBackground}>
              <View style={styles.gradientContainer}>
                <LinearGradient
                  colors={['transparent', 'rgba(255, 255, 204,0.8)']}
                  style={styles.gradient}
                />
              </View>
              <DetailsContainer
                name={route.params.name}
                address={route.params.address}
                isFavorite={targetCafe?.favorite}
                addCafeToFavorites={addCafeToFavorites}
              />
            </ImageBackground>
          </View>
          <FlatList
            data={productsList}
            renderItem={renderProductsList}
            keyExtractor={item => item.cofeId + item.id}
            numColumns={2}
          />
        </>
      ) : (
        <View style={styles.emptyListContainer}>
          <Image source={image} style={styles.imageNoCoffee} />
          <Text style={styles.errorText}>{errorMessages[0]}</Text>
          <Text style={styles.errorText}>{errorMessages[1]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackgroundContainer: {
    height: '44%',
  },
  imageBackground: {
    flex: 1,
  },
  gradientContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
  emptyListContainer: {
    alignItems: 'center',
  },
  imageNoCoffee: {
    width: 180,
    height: 180,
    marginLeft: 20,
    marginVertical: '22%',
  },
  errorText: {
    color: COLORS.slateGray,
    fontSize: 16,
    paddingVertical: 4,
  },
});
