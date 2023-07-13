import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {HeaderComponent} from '../common/components/HeaderComponent';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CafeInfo} from './api/CoffeeRequest';
import {COLORS} from '../../resources/colors';
import LinearGradient from 'react-native-linear-gradient';

export const CafeDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, CafeInfo>, string>>();
  const goBackHandler = (): void => {
    navigation.goBack();
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
            <Text style={styles.cafeaddress}>{route.params.address}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackgroundContainer: {
    backgroundColor: 'red',
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
    marginRight: '20%',
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
  },
});
