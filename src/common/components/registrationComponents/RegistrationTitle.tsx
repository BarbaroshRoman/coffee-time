import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

import {COLORS} from '../../../../resources/colors';

type Props = {
  fadeAnim: Animated.Value;
};

export const RegistrationTitle = (props: Props) => {
  const fadeAnim = props.fadeAnim;
  const opacity = {opacity: fadeAnim};

  return (
    <View style={styles.titleContainer}>
      <Animated.View style={opacity}>
        <Text style={styles.titleText}>CoffeTime</Text>
        <Text style={styles.additionalTitleText}>территория кофе</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignSelf: 'center',
    marginTop: '24%',
  },
  titleText: {
    color: COLORS.white,
    fontSize: 60,
    fontFamily: 'Lobster-Regular',
  },
  additionalTitleText: {
    color: COLORS.white,
    position: 'absolute',
    alignSelf: 'flex-end',
    fontSize: 16,
    marginTop: '26%',
    paddingHorizontal: 2,
  },
});
