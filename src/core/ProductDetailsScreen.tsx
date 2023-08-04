import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {HeaderComponent} from '../common/components/HeaderComponent';
import {COLORS} from '../../resources/colors';
import {PopUpNotification} from '../common/components/PopUpNotification';
import {ProductNameContainer} from '../common/components/ProductNameContainer';
import {CoffeeDetailsContainer} from '../common/components/CoffeeDetailsContainer';
import {OrderCoffeeContainer} from '../common/components/OrderCoffeeContainer';
import {
  addDrink,
  removeDrink,
} from '../modules/redux/favorites/favoritesReducer';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {
  IProductBriefInfo,
  IProductFullInfo,
  IProductRequest,
} from '../types/productTypes';
import {useGetProductMutation} from './api/productRequest';
import {useSetMutation, useUnsetMutation} from './api/favoriteRequest';

export const ProductDetailsScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<Record<string, IProductBriefInfo>, string>>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const sessionId = useTypedSelector(state => state.user.sessionId);
  const windowHeight = Dimensions.get('window').height;
  const popAnim = useRef(new Animated.Value(windowHeight)).current;
  const imageNoCoffee = require('../../resources/images/image_no_coffe.png');
  const iconTypeToImagePath: any = {
    milk: require('../../resources/images/milk.png'),
    coffe: require('../../resources/images/coffe.png'),
    water: require('../../resources/images/water.png'),
    temperature: require('../../resources/images/temperature.png'),
    pressure: require('../../resources/images/pressure.png'),
  };
  const [productRequest] = useGetProductMutation();
  const [setFavorite] = useSetMutation();
  const [unsetFavorite] = useUnsetMutation();
  const [productInfo, setProductInfo] = useState<IProductFullInfo | {}>({});

  const {productName, price, attribute, imagesPath, favarite} =
    productInfo as IProductFullInfo;

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = useCallback(async (): Promise<void> => {
    const item: IProductRequest = {
      sessionId: sessionId,
      productId: route.params.id,
    };
    await productRequest(item)
      .unwrap()
      .then(response => {
        setProductInfo(response ?? {});
      });
  }, [productRequest, route.params.id, sessionId]);

  const goBackHandler = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const setFavoriteHelper = useCallback(
    async (product: IProductRequest): Promise<void> => {
      await setFavorite(product)
        .unwrap()
        .then(() => {
          const newItem: IProductBriefInfo = {...route.params};
          newItem.favorite = true;
          dispatch(addDrink(newItem));
        })
        .catch(() => {
          showError('Не удалось сохранить в список избранных');
        })
        .finally(() => {
          getProduct();
        });
    },
    [dispatch, route.params, setFavorite],
  );

  const unsetFavoriteHelper = useCallback(
    async (product: IProductRequest): Promise<void> => {
      await unsetFavorite(product)
        .unwrap()
        .then(() => {
          dispatch(removeDrink(route.params.id));
        })
        .catch(() => {
          showError('Не удалось убрать из списка избранных');
        })
        .finally(() => {
          getProduct();
        });
    },
    [dispatch, route.params.id, unsetFavorite],
  );

  const setAndUnsetFavoriteProduct = useCallback(
    async (method: string): Promise<void> => {
      const product: IProductRequest = {
        sessionId: sessionId,
        productId: route.params.id,
      };
      if (method === 'set') {
        await setFavoriteHelper(product);
      } else if (method === 'unset') {
        await unsetFavoriteHelper(product);
      }
    },
    [route.params.id, sessionId],
  );

  const popIn = (): any => {
    Animated.timing(popAnim, {
      toValue: -320,
      duration: 300,
      useNativeDriver: true,
    }).start(popOut());
  };

  const popOut = (): any => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: -600,
        duration: 1400,
        useNativeDriver: true,
      }).start();
    }, 2000);
  };

  const showError = (errorMes: string): void => {
    Alert.alert('Ошибка', errorMes, [
      {
        text: 'Ok',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <HeaderComponent isGoBack={true} goBackHandler={goBackHandler} />
      {Object.keys(productInfo).length !== 0 ? (
        <>
          <View style={styles.shopHitLabel}>
            <Text style={styles.shopHitText}>хит</Text>
            <View style={styles.sharpenedBox} />
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: imagesPath}} style={styles.coffeeImage} />
          </View>
          <PopUpNotification popAnim={popAnim} />
          <ProductNameContainer
            productName={productName}
            favarite={favarite}
            setAndUnsetFavoriteProduct={setAndUnsetFavoriteProduct}
          />
          <CoffeeDetailsContainer
            attribute={attribute}
            iconTypeToImagePath={iconTypeToImagePath}
          />
          <OrderCoffeeContainer price={price} popIn={popIn} />
        </>
      ) : (
        <View style={styles.emptyListContainer}>
          <Image source={imageNoCoffee} style={styles.imageNoCoffee} />
          <Text style={styles.errorText}>Не удалось получить данные</Text>
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
  imageContainer: {
    flex: 1,
    marginTop: 2,
    alignItems: 'center',
  },
  shopHitLabel: {
    flexDirection: 'row',
    width: 80,
    height: 50,
    marginTop: 2,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  shopHitText: {
    fontSize: 18,
    color: COLORS.white,
    marginRight: 8,
  },
  sharpenedBox: {
    borderTopWidth: 28,
    borderBottomWidth: 25,
    borderRightWidth: 35,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'white',
    overflow: 'hidden',
  },
  coffeeImage: {
    flex: 1,
    width: '100%',
    height: '100%',
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
