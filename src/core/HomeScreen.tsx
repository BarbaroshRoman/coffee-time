import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {HeaderComponent} from '../common/components/HeaderComponent';
import {CafeClientRequest, CafeInfo} from './api/CoffeeRequest';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {CafeListView} from '../common/components/CafeListView';
import {COLORS} from '../../resources/colors';
import {navigationHomePages} from '../navigation/components/navigationHomePages';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const sessionId = useTypedSelector(state => state.user.sessionId);

  const [cafeList, setCafeList] = useState<CafeInfo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllCafe();
  }, []);
  const getAllCafe = async () => {
    const cafeRequest = new CafeClientRequest();

    try {
      const allCafe: CafeInfo[] | null = await cafeRequest.getAll(sessionId);

      const oldLinks = [
        'http://lovecafedecafe.com/templates/beez_20/logo0001.jpg',
        'http://company.es-pmr.com/uploads/764SDC10782.jpg',
      ];
      const newLinks = [
        'https://idei.club/uploads/posts/2022-11/1667335707_2-idei-club-p-dizain-kafe-snaruzhi-instagram-2.jpg',
        'https://interiorscafe.ru/wp-content/uploads/pasta-grill-cafe-01.jpg',
      ];

      const newCafeList: CafeInfo[] | undefined = allCafe?.map(el => {
        if (el.images === oldLinks[0]) {
          el.images = newLinks[0];
        } else if (el.images === oldLinks[1]) {
          el.images = newLinks[1];
        }
        return el;
      });
      setCafeList(newCafeList ?? []);
    } catch {
      setErrorMessage('Ошибка. Не удалось получить данные.');
    }
  };

  const goToCafe = (item: CafeInfo): void => {
    navigation.navigate(navigationHomePages.details as never, item as never);
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
    backgroundColor: COLORS.gainsboro,
  },
});
