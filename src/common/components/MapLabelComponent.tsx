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
    <TouchableOpacity
      style={[styles.mapLabel, isMap && {borderColor: COLORS.white}]}
      onPress={changeMapLabelPosition}>
      <View
        style={[
          styles.menuOutlineContainer,
          !isMap && {backgroundColor: COLORS.transparent},
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
          isMap && {backgroundColor: COLORS.transparent},
        ]}>
        <Ionicons
          name={'menu-outline'}
          color={isMap ? COLORS.white : COLORS.slateGray}
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapLabel: {
    position: 'absolute',
    flexDirection: 'row',
    marginTop: 70,
    width: 126,
    height: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
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
