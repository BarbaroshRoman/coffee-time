import {Image, StyleSheet, Text, View} from 'react-native';
import {IAttributeInfo} from '../../core/api/CoffeeRequest';
import React from 'react';
import {COLORS} from '../../../resources/colors';

type Props = {
  attribute: IAttributeInfo[];
  iconTypeToImagePath: any;
};
export const CoffeeDetailsContainer = (props: Props) => {
  const {iconTypeToImagePath, attribute} = props;
  return (
    <View style={styles.coffeeDetailsContainer}>
      {attribute?.map((el: IAttributeInfo) => (
        <View key={el.id}>
          <Image
            source={iconTypeToImagePath[el.iconType]}
            style={styles.coffeeDetailsImage}
          />
          <Text style={styles.coffeeDetailsText}>{el.iconType}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  coffeeDetailsContainer: {
    flexDirection: 'row',
    marginLeft: 8,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 20,
    borderColor: COLORS.ghostWhite,
  },
  coffeeDetailsImage: {
    width: 40,
    height: 40,
    marginLeft: 12,
  },
  coffeeDetailsText: {
    textAlign: 'center',
    marginLeft: 10,
    marginTop: 4,
    fontSize: 10,
  },
});
