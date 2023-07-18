import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HeaderComponent} from '../common/components/HeaderComponent';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  CafeRequest,
  ICafeInfo,
  ICafeRequest,
  IProductBriefInfo,
  IProductRequest,
  ProductBriefInfo,
  ProductClientRequest,
} from './api/CoffeeRequest';
import {COLORS} from '../../resources/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {ProductsListView} from '../common/components/ProductsListView';
import {DetailsContainer} from '../common/components/DetailsContainer';
import {replaceProductsLinks} from '../common/helpers/replaceProductsLinks';
import {navigationHomePages} from '../navigation/components/navigationHomePages';

export const CafeDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, ICafeInfo>, string>>();
  const sessionId = useTypedSelector(state => state.user.sessionId);
  const image = require('../../resources/images/image_no_coffe.png');

  const [productsList, setProductsList] = useState<IProductBriefInfo[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const goBackHandler = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const getAllProduct = async () => {
    const productsRequest = new ProductClientRequest();
    const cafeData: ICafeRequest = {
      sessionId: sessionId,
      cafeId: route.params.id,
    };

    try {
      const allProduct: IProductBriefInfo[] | null =
        await productsRequest.getProductsCafe(new CafeRequest(cafeData));

      const newProductList = replaceProductsLinks(allProduct);
      setProductsList(newProductList ?? []);
    } catch {
      setErrorMessages([
        'Здесь нет ни одной чашки кофе',
        'Попробуйте вернуться к нам позже',
      ]);
    }
  };

  const goToProduct = useCallback(
    (item: IProductBriefInfo): void => {
      const newItem: IProductRequest = {
        sessionId: sessionId,
        productId: item.id,
      };
      navigation.navigate(
        navigationHomePages.productDetails as never,
        newItem as never,
      );
    },
    [navigation],
  );

  const renderProductsList = ({item}: {item: IProductBriefInfo}) => {
    return <ProductsListView item={item} goToProduct={goToProduct} />;
  };

  return (
    <View style={styles.container}>
      <HeaderComponent isGoBack={true} goBackHandler={goBackHandler} />
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
          <Image source={image} style={styles.image} />
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
  image: {
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
