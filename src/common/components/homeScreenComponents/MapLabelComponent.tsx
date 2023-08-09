import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../../resources/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useMemo} from 'react';

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

  const borderColor = useMemo(
    () => (isMap ? COLORS.white : COLORS.dimGray),
    [isMap],
  );

  const locationIconBackground = useMemo(
    () => (isMap ? COLORS.paleGreen : COLORS.transparent),
    [isMap],
  );

  const menuIconBackground = useMemo(
    () => (isMap ? COLORS.transparent : COLORS.paleGreen),
    [isMap],
  );

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
      borderColor: borderColor,
      paddingHorizontal: 2,
    },
    locationOutlineContainer: {
      width: 60,
      height: 24,
      backgroundColor: locationIconBackground,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuOutlineContainer: {
      width: 60,
      height: 24,
      backgroundColor: menuIconBackground,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity style={styles.mapLabel} onPress={changeMapLabelPosition}>
      <View style={styles.locationOutlineContainer}>
        <Ionicons
          name={'location-outline'}
          color={COLORS.slateGray}
          size={20}
        />
      </View>
      <View style={styles.menuOutlineContainer}>
        <Ionicons name={'menu-outline'} color={menuOutlineColor} size={24} />
      </View>
    </TouchableOpacity>
  );
};
