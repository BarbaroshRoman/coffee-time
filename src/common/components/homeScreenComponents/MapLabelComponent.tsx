import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../../../resources/colors';

interface IProps {
  isMap: boolean;
  changeMapLabelPosition: () => void;
}
export const MapLabelComponent = (props: IProps) => {
  const {isMap, changeMapLabelPosition} = props;

  const menuOutlineColor = useMemo(
    () => (isMap ? COLORS.white : COLORS.slateGray),
    [isMap],
  );

  const locationOutlineStyle = useMemo(
    () => [
      styles.menuOutlineContainer,
      !isMap && {backgroundColor: COLORS.transparent},
    ],
    [isMap],
  );

  const menuOutlineStyle = useMemo(
    () => [
      styles.menuOutlineContainer,
      isMap && {backgroundColor: COLORS.transparent},
    ],
    [isMap],
  );

  const labelButtonStyle = useMemo(
    () => [styles.mapLabel, isMap && {borderColor: COLORS.white}],
    [isMap],
  );

  return (
    <TouchableOpacity style={labelButtonStyle} onPress={changeMapLabelPosition}>
      <View style={locationOutlineStyle}>
        <Ionicons
          name={'location-outline'}
          color={COLORS.slateGray}
          size={20}
        />
      </View>
      <View style={menuOutlineStyle}>
        <Ionicons name={'menu-outline'} color={menuOutlineColor} size={24} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapLabel: {
    position: 'absolute',
    flexDirection: 'row',
    top: '11%',
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
