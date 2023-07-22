import React from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  popAnim: any;
};
export const PopUpNotification = (props: Props) => {
  const popAnim = props.popAnim;
  return (
    <View>
      <Animated.View
        style={[
          styles.toastContainer,
          {
            transform: [{translateY: popAnim}],
          },
        ]}>
        <View style={styles.toastRow}>
          <AntDesign name={'checkcircleo'} size={24} color={'#6dcf81'} />
          <View style={styles.toastText}>
            <Text style={styles.headerText}>Удачно</Text>
            <Text style={styles.bodyText}>Операция оплачена</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    height: 60,
    width: 350,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
