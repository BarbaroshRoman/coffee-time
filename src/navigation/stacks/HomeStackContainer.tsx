import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {navigationStacks} from '../components/navigationStacks';
import {CafeDetails} from '../../core/CafeDetails';
import {navigationHomePages} from '../components/navigationHomePages';
import {DrawerStackContainer} from './DrawerStackContainer';

const HomeStack = createNativeStackNavigator();

export const HomeStackContainer = () => {
  return (
    <HomeStack.Navigator initialRouteName={navigationStacks.drawer}>
      <HomeStack.Screen
        name={navigationStacks.drawer}
        component={DrawerStackContainer}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name={navigationHomePages.details}
        component={CafeDetails}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
