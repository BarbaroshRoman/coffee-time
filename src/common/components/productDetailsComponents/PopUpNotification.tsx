import React from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {COLORS} from '../../../../resources/colors';

type Props = {
  popAnim: Animated.Value;
};
export const PopUpNotification = (props: Props) => {
  const popAnim = props.popAnim;

  const styles = StyleSheet.create({
    toastContainer: {
      position: 'absolute',
      height: 60,
      width: 350,
      backgroundColor: COLORS.glitter,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 10,
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      transform: [{translateY: popAnim}],
    },
    toastRow: {
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    toastText: {
      width: '70%',
      padding: 2,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 15,
    },
    bodyText: {
      fontSize: 12,
    },
  });

  return (
    <View>
      <Animated.View style={styles.toastContainer}>
        <View style={styles.toastRow}>
          <AntDesign name={'checkcircleo'} size={24} color={COLORS.armyGreen} />
          <View style={styles.toastText}>
            <Text style={styles.headerText}>Удачно</Text>
            <Text style={styles.bodyText}>Операция оплачена</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};
