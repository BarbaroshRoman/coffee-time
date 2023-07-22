import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Spinner from 'react-native-spinkit';

import {HeaderComponent} from '../common/components/HeaderComponent';
import {CafeClientRequest, ICafeInfo} from './api/CoffeeRequest';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {CafeListView} from '../common/components/CafeListView';
import {COLORS} from '../../resources/colors';
import {navigationHomePages} from '../navigation/components/navigationHomePages';
import {replaceCafeLinks} from '../common/helpers/replaceCafeLinks';

export const HomeScreen: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const sessionId = useTypedSelector(state => state.user.sessionId);
  const isLoading = useTypedSelector(state => state.user.loading);
  const image = require('../../resources/images/image_no_coffe.png');

  const [cafeList, setCafeList] = useState<ICafeInfo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllCafe();
  }, []);

  const getAllCafe = useCallback(async (): Promise<void> => {
    const cafeRequest = new CafeClientRequest();

    try {
      const allCafe: ICafeInfo[] | null = await cafeRequest.getAll(sessionId);

      const newCafeList = replaceCafeLinks(allCafe);
      setCafeList(newCafeList ?? []);
    } catch {
      setErrorMessage('По вашему запросу ничего не найдено');
    }
  }, [sessionId]);

  const goToCafe = (item: ICafeInfo): void => {
    navigation.navigate(
      navigationHomePages.cafeDetails as never,
      item as never,
    );
  };

  const renderCafeList = ({item}: {item: ICafeInfo}) => {
    return <CafeListView item={item} goToCafe={goToCafe} />;
  };
  const openDrawer = (): void => {
    navigation.openDrawer();
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.titleText}>CoffeTime</Text>
        <Spinner type="Wave" color={COLORS.black} size={80} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <HeaderComponent openDrawer={openDrawer} />
        {!cafeList.length && (
          <View style={styles.emptyListContainer}>
            <Image source={image} style={styles.coffeeImage} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
        <FlatList
          data={cafeList}
          renderItem={renderCafeList}
          keyExtractor={item => item.id + item.name}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8%',
  },
  titleText: {
    fontSize: 40,
    fontFamily: 'Lobster-Regular',
    color: COLORS.dimGray,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
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
