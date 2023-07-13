import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CafeInfo} from '../../core/api/CoffeeRequest';
import {COLORS} from '../../../resources/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  item: CafeInfo;
  goToCafe: (item: CafeInfo) => void;
};
export const CafeListView = (props: Props) => {
  const {item, goToCafe} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={() => goToCafe(item)}>
      <Image source={{uri: item.images}} style={styles.image} />
      <View style={styles.cafeTableOfContents}>
        <Text style={styles.cafeName}>{item.name}</Text>
        <Text style={styles.addressHelperText}>мы находимся:</Text>
        <Text style={styles.addressText}>{item.address}</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>подробнее</Text>
          <FontAwesome name={'angle-right'} size={16} style={styles.icon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginBottom: 4,
    height: 126,
    elevation: 2,
  },
  image: {
    height: 126,
    width: 126,
  },
  cafeTableOfContents: {
    flexDirection: 'column',
    flex: 1,
  },
  cafeName: {
    paddingLeft: 14,
    marginTop: 10,
    fontSize: 20,
    color: COLORS.paleGreen,
  },
  addressHelperText: {
    fontSize: 18,
    color: COLORS.darkGray,
    paddingLeft: 14,
    marginTop: 2,
  },
  addressText: {
    color: COLORS.darkGray,
    paddingLeft: 14,
    paddingRight: 8,
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 6,
    paddingRight: 20,
  },
  detailText: {
    color: COLORS.ghostWhite,
  },
  icon: {
    paddingLeft: 8,
    color: COLORS.ghostWhite,
  },
});
