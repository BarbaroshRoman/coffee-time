import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../resources/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

interface IProps {
  isMap: boolean;
  changeMapLabelPosition: () => void;
}
export const MapLabelComponent = (props: IProps) => {
  const {isMap, changeMapLabelPosition} = props;
  return (
    <TouchableOpacity style={styles.mapLabel} onPress={changeMapLabelPosition}>
      <View
        style={[
          styles.menuOutlineContainer,
          !isMap && {backgroundColor: COLORS.white},
        ]}>
        <Ionicons
          name={'location-outline'}
          color={COLORS.slateGray}
          size={20}
        />
      </View>
      <View
        style={[
          styles.menuOutlineContainer,
          isMap && {backgroundColor: COLORS.white},
        ]}>
        <Ionicons name={'menu-outline'} color={COLORS.slateGray} size={24} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapLabel: {
    flexDirection: 'row',
    width: 126,
    height: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 14,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 2,
  },
  menuOutlineContainer: {
    width: 60,
    height: 24,
    backgroundColor: COLORS.paleGreen,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
