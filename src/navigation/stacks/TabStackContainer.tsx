import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {FavoriteDrinksScreen} from '../../core/FavoriteDrinksScreen';
import {navigationFavoritePages} from '../components/navigationFavoritePages';
import {FavoriteCafeScreen} from '../../core/FavoriteCafeScreen';
import {COLORS} from '../../../resources/colors';

const Tab = createBottomTabNavigator();

export const TabStackContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: COLORS.slateGray,
        tabBarInactiveBackgroundColor: COLORS.gainsboro,
        tabBarActiveTintColor: COLORS.asparagus,
        tabBarInactiveTintColor: COLORS.slateGray,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: {
          paddingBottom: 4,
        },
      }}>
      <Tab.Screen
        name={navigationFavoritePages.favoriteDrinks}
        component={FavoriteDrinksScreen}
        options={{
          // tabBarBadge: 3,
          tabBarIcon: ({color}) => {
            return <FontAwesome5 name={'mug-hot'} size={20} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={navigationFavoritePages.favoriteCafe}
        component={FavoriteCafeScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <MaterialIcons name={'store'} size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    marginHorizontal: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.paleGreen,
    elevation: 8,
    overflow: 'hidden',
  },
});
