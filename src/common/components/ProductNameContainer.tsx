import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {COLORS} from '../../../resources/colors';

type Props = {
  productName: string;
  favarite: boolean;
  setAndUnsetFavoriteProduct: (method: string) => void;
};
export const ProductNameContainer = (props: Props) => {
  const {favarite, setAndUnsetFavoriteProduct, productName} = props;

  return (
    <View style={styles.productNameContainer}>
      <Text style={styles.productName}>{productName}</Text>
      <TouchableOpacity
        onPress={() => {
          favarite
            ? setAndUnsetFavoriteProduct('unset')
            : setAndUnsetFavoriteProduct('set');
        }}>
        <AntDesign
          name={favarite ? 'heart' : 'hearto'}
          color={COLORS.red}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  productName: {
    color: COLORS.dimGray,
    fontSize: 24,
    paddingLeft: 20,
    paddingRight: 16,
    height: 60,
    textAlignVertical: 'center',
    fontFamily: 'Lobster-Regular',
  },
});
