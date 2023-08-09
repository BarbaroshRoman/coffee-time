import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS} from '../../../../resources/colors';

type Props = {
  price: number;
  popUpWindow: () => void;
};
export const OrderCoffeeContainer = (props: Props) => {
  const {popUpWindow, price} = props;
  return (
    <View style={styles.orderCoffeeContainer}>
      <Text style={styles.priceText}>{price} ₽</Text>
      <TouchableOpacity style={styles.orderCoffeeButton} onPress={popUpWindow}>
        <Text style={styles.orderCoffeeText}>Заказать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  orderCoffeeContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 44,
    paddingVertical: 10,
  },
  priceText: {
    flex: 1,
    fontSize: 30,
  },
  orderCoffeeButton: {
    backgroundColor: COLORS.paleGreen,
    marginRight: 40,
    width: '50%',
    height: 41,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderCoffeeText: {
    color: COLORS.white,
    fontSize: 14,
  },
});
