import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../resources/colors';

type Props = {
  price: number;
  popIn: () => any;
};
export const OrderCoffeeContainer = (props: Props) => {
  const {popIn, price} = props;
  return (
    <View style={styles.orderCoffeeContainer}>
      <Text style={styles.priceText}>{price} ₽</Text>
      <TouchableOpacity style={styles.orderCoffeeButton} onPress={popIn}>
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
