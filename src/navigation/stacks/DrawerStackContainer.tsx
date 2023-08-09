import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {navigationStacks} from '../components/navigationStacks';
import {HomeScreen} from '../../core/HomeScreen';
import {CustomDrawerContent} from '../../common/components/drawerComponent/CustomDrawerContent';
import {COLORS} from '../../../resources/colors';
import {TabStackContainer} from './TabStackContainer';

const Drawer = createDrawerNavigator();
export const DrawerStackContainer = () => {
  return (
    <Drawer.Navigator
      initialRouteName={navigationStacks.home}
      screenOptions={{
        drawerActiveTintColor: COLORS.silver,
        drawerInactiveTintColor: COLORS.paleGreen,
        drawerActiveBackgroundColor: COLORS.asparagus,
        drawerLabelStyle: {marginLeft: -14},
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={navigationStacks.home}
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <FontAwesome5 name={'coffee'} color={color} size={16} />
          ),
        }}
      />
      <Drawer.Screen
        name={navigationStacks.favorite}
        component={TabStackContainer}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <FontAwesome5 name={'heart'} color={color} size={16} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
