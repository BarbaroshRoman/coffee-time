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

import {
  FavoriteClientRequest,
  IProductBriefInfo,
  IProductFullInfo,
  IProductRequest,
  ProductClientRequest,
  ProductRequest,
} from './api/CoffeeRequest';
import {HeaderComponent} from '../common/components/HeaderComponent';
import {COLORS} from '../../resources/colors';
import {replaceLinksForProductScreen} from '../common/helpers/replaceLinksForProductScreen';
import {PopUpNotification} from '../common/components/PopUpNotification';
import {ProductNameContainer} from '../common/components/ProductNameContainer';
import {CoffeeDetailsContainer} from '../common/components/CoffeeDetailsContainer';
import {OrderCoffeeContainer} from '../common/components/OrderCoffeeContainer';
import {
  addDrink,
  removeDrink,
} from '../modules/redux/reducers/favorites/favoritesReducer';
import {useTypedSelector} from '../hooks/useTypedSelector';

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

  const [productInfo, setProductInfo] = useState<IProductFullInfo | {}>({});
  const [errorMessage, setErrorMessage] = useState('');

  const {productName, price, attribute, imagesPath, favarite} =
    productInfo as IProductFullInfo;

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = useCallback(async (): Promise<void> => {
    const productRequest = new ProductClientRequest();
    const item: IProductRequest = {
      sessionId: sessionId,
      productId: route.params.id,
    };

    try {
      const product: IProductFullInfo | null = await productRequest.getProduct(
        new ProductRequest(item),
      );
      const newProduct = replaceLinksForProductScreen(product);
      setProductInfo(newProduct ?? {});
    } catch {
      setErrorMessage('Не удалось получить данные');
    }
  }, [route.params.id, sessionId]);

  const goBackHandler = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

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

  const setAndUnsetFavoriteProduct = useCallback(
    async (method: string): Promise<void> => {
      const favoriteClientRequest = new FavoriteClientRequest();
      const product: IProductRequest = {
        sessionId: sessionId,
        productId: route.params.id,
      };

      try {
        if (method === 'set') {
          const favoriteRequest: boolean | null =
            await favoriteClientRequest.set(new ProductRequest(product));

          if (favoriteRequest) {
            setProductInfo(prevState => ({
              ...prevState,
              favarite: favoriteRequest,
            }));
            dispatch(addDrink(route.params));
          }
        } else if (method === 'unset') {
          const favoriteRequest: boolean | null =
            await favoriteClientRequest.unset(new ProductRequest(product));

          if (favoriteRequest) {
            setProductInfo(prevState => ({
              ...prevState,
              favarite: favoriteRequest,
            }));
            dispatch(removeDrink(route.params.id));
          }
        }
      } catch {
        showError('Не удалось сохранить в список избранных');
      } finally {
        getProduct();
      }
    },
    [dispatch, route.params, sessionId],
  );

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
          <View style={styles.label}>
            <Text style={styles.shopHitText}>хит</Text>
            <View style={styles.sharpenedBox} />
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: imagesPath}} style={styles.cofeeImage} />
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
          <Image source={imageNoCoffee} style={styles.coffeeImage} />
          <Text style={styles.errorText}>{errorMessage}</Text>
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
    marginTop: 2,
    alignItems: 'center',
  },
  label: {
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
  cofeeImage: {
    width: 260,
    height: 260,
  },
  emptyListContainer: {
    alignItems: 'center',
  },
  coffeeImage: {
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
