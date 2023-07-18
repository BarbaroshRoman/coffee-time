import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {HeaderComponent} from '../common/components/HeaderComponent';
import {CafeClientRequest, CafeInfo} from './api/CoffeeRequest';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {CafeListView} from '../common/components/CafeListView';
import {COLORS} from '../../resources/colors';
import {navigationHomePages} from '../navigation/components/navigationHomePages';
import {replaceCafeLinks} from '../common/helpers/replaceCafeLinks';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const sessionId = useTypedSelector(state => state.user.sessionId);
  const image = require('../../resources/images/image_no_coffe.png');

  const [cafeList, setCafeList] = useState<CafeInfo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllCafe();
  }, []);

  const getAllCafe = async () => {
    const cafeRequest = new CafeClientRequest();

    try {
      const allCafe: CafeInfo[] | null = await cafeRequest.getAll(sessionId);

      const newCafeList: CafeInfo[] | undefined = replaceCafeLinks(allCafe);
      setCafeList(newCafeList ?? []);
    } catch {
      setErrorMessage('По вашему запросу ничего не найдено');
    }
  };

  const goToCafe = (item: CafeInfo): void => {
    navigation.navigate(
      navigationHomePages.cafeDetails as never,
      item as never,
    );
  };

  const renderCafeList = ({item}: {item: CafeInfo}) => {
    return <CafeListView item={item} goToCafe={goToCafe} />;
  };
  const openDrawer = (): void => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.container}>
      <HeaderComponent openDrawer={openDrawer} />
      {!cafeList.length && (
        <View style={styles.emptyListContainer}>
          <Image source={image} style={styles.image} />
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyListContainer: {
    alignItems: 'center',
  },
  image: {
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
