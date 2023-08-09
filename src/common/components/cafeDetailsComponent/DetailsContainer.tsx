import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {COLORS} from '../../../../resources/colors';

interface IProps {
  name: string;
  address: string;
  isFavorite: boolean | undefined;
  addCafeToFavorites: () => void;
}
export const DetailsContainer = (props: IProps) => {
  const {name, address, isFavorite, addCafeToFavorites} = props;

  const favoritesIcon = useMemo(
    () => (isFavorite ? 'heart' : 'hearto'),
    [isFavorite],
  );

  const iconPosition = useMemo(
    () => (isFavorite ? 'flex-start' : 'flex-end'),
    [isFavorite],
  );

  const styles = StyleSheet.create({
    detailsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingRight: 14,
    },
    cafeDetailsBox: {
      flex: 1,
    },
    cafeName: {
      fontFamily: 'Lobster-Regular',
      fontSize: 30,
      color: COLORS.dimGray,
      paddingBottom: 4,
      paddingLeft: 16,
    },
    cafeAddress: {
      fontSize: 18,
      paddingBottom: 8,
      paddingLeft: 22,
    },
    iconContainer: {
      backgroundColor: COLORS.white,
      height: 40,
      width: 60,
      borderRadius: 20,
      marginBottom: 10,
      alignItems: iconPosition,
    },
    roundFrame: {
      flex: 1,
      borderColor: COLORS.silver,
      width: 40,
      borderRadius: 20,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.cafeDetailsBox}>
        <Text style={styles.cafeName}>{name}</Text>
        <Text style={styles.cafeAddress}>{address}</Text>
      </View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={addCafeToFavorites}>
        <View style={styles.roundFrame}>
          <AntDesign name={favoritesIcon} color={COLORS.red} size={28} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
