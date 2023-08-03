import React from 'react';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

import {COLORS} from '../../resources/colors';
import {HeaderComponent} from '../common/components/HeaderComponent';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {navigationHomePages} from '../navigation/components/navigationHomePages';
import {INewCafeInfo} from '../common/helpers/replaceCafeList';
import {CafeListView} from '../common/components/CafeListView';

interface IFavoriteCafeScreenProps {
  navigation: DrawerContentComponentProps['navigation'];
}

export const FavoriteCafeScreen: React.FC<IFavoriteCafeScreenProps> = ({
  navigation,
}) => {
  const image = require('../../resources/images/image_no_coffe.png');
  const cafeList = useTypedSelector(state => state.favorites.cafe);

  const openDrawer = (): void => {
    navigation.openDrawer();
  };

  const goToCafe = (item: INewCafeInfo): void => {
    navigation.navigate(
      navigationHomePages.cafeDetails as never,
      item as never,
    );
  };

  const renderCafeList = ({item}: {item: INewCafeInfo}) => {
    return <CafeListView item={item} goToCafe={goToCafe} />;
  };

  return (
    <View style={styles.container}>
      <HeaderComponent isGoBack={false} openDrawer={openDrawer} />
      {cafeList.length ? (
        <View style={styles.cafeListContainer}>
          <FlatList
            data={cafeList}
            renderItem={renderCafeList}
            keyExtractor={item => item.id + item.name}
          />
        </View>
      ) : (
        <View style={styles.emptyListContainer}>
          <Image source={image} style={styles.coffeeImage} />
          <Text style={styles.errorText}>
            Вы пока что не добавили любимое кафе
          </Text>
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
  cafeListContainer: {
    marginBottom: '30%',
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
