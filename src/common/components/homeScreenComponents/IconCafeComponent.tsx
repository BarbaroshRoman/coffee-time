import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {COLORS} from '../../../../resources/colors';

type Props = {
  cafeName: string;
};
export const IconCafeComponent = (props: Props) => {
  const cafeName = props.cafeName;
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={'coffee'} color={COLORS.white} />
      </View>
      <Text style={styles.cafeNameText}>{cafeName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    backgroundColor: COLORS.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: COLORS.asparagus,
    borderColor: COLORS.white,
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cafeNameText: {
    fontFamily: 'Lobster-Regular',
    color: COLORS.asparagus,
  },
});
