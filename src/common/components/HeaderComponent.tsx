import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

import {COLORS} from '../../../resources/colors';

type Props = {
  isGoBack?: boolean;
};
export const HeaderComponent: React.FC<Props> = props => {
  const navigation =
    useNavigation() as DrawerContentComponentProps['navigation'];
  const isGoBack = props.isGoBack;

  const openDrawer = useCallback((): void => {
    navigation.openDrawer();
  }, [navigation]);

  const goBackHandler = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const leftButton = useCallback((): void => {
    isGoBack ? goBackHandler() : openDrawer();
  }, [goBackHandler, isGoBack, openDrawer]);

  const iconName = useMemo(
    () => (isGoBack ? 'angle-left' : 'bars'),
    [isGoBack],
  );

  const iconSize = useMemo(() => (isGoBack ? 34 : 24), [isGoBack]);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.iconContainer} onPress={leftButton}>
        <FontAwesome name={iconName} size={iconSize} color={COLORS.black} />
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
  iconContainer: {
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
