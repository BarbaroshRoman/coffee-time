import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';

import {COLORS} from '../../../resources/colors';

interface IProps {
  name: string;
  address: string;
}
export const DetailsContainer = (props: IProps) => {
  const {name, address} = props;
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.cafeName}>{name}</Text>
      <View style={styles.bottomContainer}>
        <Text style={styles.cafeaddress}>{address}</Text>
        <View style={styles.iconContainer}>
          <View style={styles.roundFrame}>
            <AntDesign name={'hearto'} color={COLORS.red} size={28} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cafeName: {
    fontFamily: 'Lobster-Regular',
    fontSize: 30,
    color: COLORS.dimGray,
    paddingBottom: 4,
    paddingLeft: 16,
  },
  cafeaddress: {
    fontSize: 18,
    paddingBottom: 8,
    paddingLeft: 22,
    marginRight: '18%',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 14,
  },
  iconContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    height: 40,
    width: 60,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  roundFrame: {
    flex: 1,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.silver,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
