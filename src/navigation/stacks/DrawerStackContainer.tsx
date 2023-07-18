import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {navigationStacks} from '../components/navigationStacks';
import {HomeScreen} from '../../core/HomeScreen';
import {CustomDrawerContent} from '../../common/components/CustomDrawerContent';
import {COLORS} from '../../../resources/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
      drawerContent={props => <CustomDrawerContent {...props} />}>
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
    </Drawer.Navigator>
  );
};
