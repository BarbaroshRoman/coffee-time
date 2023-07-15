import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../../resources/colors';

type Props = {
  goBackHandler?: () => void;
  isGoBack?: boolean;
  openDrawer?: () => void;
};
export const HeaderComponent: React.FC<Props> = props => {
  const {goBackHandler, isGoBack, openDrawer} = props;

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => (isGoBack ? goBackHandler() : openDrawer)}>
        <FontAwesome
          name={isGoBack ? 'angle-left' : 'bars'}
          size={isGoBack ? 34 : 24}
          color={COLORS.black}
        />
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.titleText}>CoffeTime</Text>
      </View>
      <View style={styles.emptyContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: '10%',
    backgroundColor: COLORS.white,
  },
  icon: {
    paddingHorizontal: '4%',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.silver,
  },
  titleText: {
    fontSize: 26,
    fontFamily: 'Lobster-Regular',
    color: COLORS.dimGray,
  },
  emptyContainer: {
    width: '12%',
  },
});
