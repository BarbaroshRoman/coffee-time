import React, {useCallback, useEffect, useState} from 'react';
import {
  IProductFullInfo,
  IProductRequest,
  ProductClientRequest,
  ProductRequest,
} from './api/CoffeeRequest';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Image, StyleSheet, Text, View} from 'react-native';
import {HeaderComponent} from '../common/components/HeaderComponent';
import {COLORS} from '../../resources/colors';
import {replaceLinksForProductScreen} from '../common/helpers/replaceLinksForProductScreen';

export const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, IProductRequest>, string>>();
  const navigation = useNavigation();
  const image = require('../../resources/images/image_no_coffe.png');

  const [productInfo, setProductInfo] = useState<IProductFullInfo | {}>({});
  const [errorMessage, setErrorMessage] = useState('');

  const {
    cofeId,
    cofeName,
    productName,
    favarite,
    id,
    price,
    attribute,
    imagesPath,
  } = productInfo;

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const productRequest = new ProductClientRequest();
    const item: IProductRequest = route.params;

    try {
      const product: IProductFullInfo | null = await productRequest.getProduct(
        new ProductRequest(item),
      );
      const newProduct = replaceLinksForProductScreen(product);
      setProductInfo(newProduct ?? {});
    } catch {
      setErrorMessage('Не удалось получить данные');
    }
  };

  const goBackHandler = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <HeaderComponent isGoBack={true} goBackHandler={goBackHandler} />
      {Object.keys(productInfo).length !== 0 ? (
        <View style={styles.imageContainer}>
          <Image source={{uri: imagesPath}} style={styles.cofeeImage} />
        </View>
      ) : (
        <View style={styles.emptyListContainer}>
          <Image source={image} style={styles.image} />
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: 'red',
    // height: '46%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cofeeImage: {
    width: 250,
    height: 250,
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
