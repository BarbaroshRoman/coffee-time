import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

import {COLORS} from '../../resources/colors';
import {HeaderComponent} from '../common/components/HeaderComponent';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {INewCafeInfo} from '../common/helpers/replaceCafeList';
import {CafeListView} from '../common/components/CafeListView';

export const FavoriteCafeScreen: React.FC = () => {
  const image = require('../../resources/images/image_no_coffe.png');
  const cafeList = useTypedSelector(state => state.favorites.cafe);

  const renderCafeList = ({item}: {item: INewCafeInfo}) => {
    return <CafeListView item={item} />;
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      {cafeList.length ? (
        <View style={styles.indentForMapLabel}>
          <FlatList
            data={cafeList}
            renderItem={renderCafeList}
            keyExtractor={item => item.id + item.name}
          />
        </View>
      ) : (
        <View style={styles.emptyListContainer}>
          <Image source={image} style={styles.imageNoCoffee} />
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
  indentForMapLabel: {
    marginBottom: '30%',
  },
  emptyListContainer: {
    alignItems: 'center',
  },
  imageNoCoffee: {
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
