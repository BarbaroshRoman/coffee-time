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
  ProductBriefInfo,
  ProductClientRequest,
} from './api/CoffeeRequest';
import {COLORS} from '../../resources/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {ProductsListView} from '../common/components/ProductsListView';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const CafeDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, ICafeInfo>, string>>();
  const sessionId = useTypedSelector(state => state.user.sessionId);

  const [productsList, setProductsList] = useState<ProductBriefInfo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllProduct();
  }, []);

  const goBackHandler = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const getAllProduct = async () => {
    const productRequest = new ProductClientRequest();
    const cafeData: ICafeRequest = {
      sessionId: sessionId,
      cafeId: route.params.id,
    };

    try {
      const allProduct = await productRequest.getProductsCafe(
        new CafeRequest(cafeData),
      );
      setProductsList(allProduct ?? []);
    } catch {
      setErrorMessage(
        'Здесь нет ни одной чашки кофе' + 'Попробуйте вернуться к нам позже',
      );
    }
  };

  const renderProductsList = ({item}: {item: IProductBriefInfo}) => {
    return <ProductsListView item={item} />;
  };

  return (
    <View style={styles.container}>
      <HeaderComponent isGoBack={true} goBackHandler={goBackHandler} />
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
          <View style={styles.detailsContainer}>
            <Text style={styles.cafeName}>{route.params.name}</Text>
            <View style={styles.bottomContainer}>
              <Text style={styles.cafeaddress}>{route.params.address}</Text>
              <View style={styles.icon}>
                <View style={styles.test}>
                  <AntDesign
                    name={'hearto'}
                    color={COLORS.ghostWhite}
                    size={28}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      {productsList ? (
        <FlatList
          data={productsList}
          renderItem={renderProductsList}
          keyExtractor={item => item.cofeId + item.id}
          numColumns={2}
        />
      ) : (
        <View>
          <Image
            source={require('../../resources/images/image_no_coffe.png')}
            style={styles.image}
          />
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
  detailsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cafeName: {
    fontFamily: 'Lobster-Regular',
    fontSize: 30,
    color: COLORS.dimGray,
    paddingBottom: 4,
    paddingLeft: 16,
  },
  cafeaddress: {
    fontSize: 18,
    paddingBottom: 8,
    paddingLeft: 22,
    marginRight: '18%',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 14,
  },
  icon: {
    flex: 1,
    backgroundColor: COLORS.white,
    height: 40,
    width: 60,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  test: {
    flex: 1,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.silver,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: 20,
    height: 20,
  },
});
