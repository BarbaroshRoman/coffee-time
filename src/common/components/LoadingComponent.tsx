import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-spinkit';

import {COLORS} from '../../../resources/colors';

export const LoadingComponent = () => {
  return (
    <View style={styles.loading}>
      <Text style={styles.titleText}>CoffeTime</Text>
      <Spinner type="Wave" color={COLORS.black} size={80} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8%',
  },
  titleText: {
    fontSize: 40,
    fontFamily: 'Lobster-Regular',
    color: COLORS.dimGray,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
});
