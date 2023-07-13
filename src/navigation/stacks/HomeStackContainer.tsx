import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {navigationStacks} from '../components/navigationStacks';
import {HomeScreen} from '../../core/HomeScreen';
import {CafeDetails} from '../../core/CafeDetails';
import {navigationHomePages} from '../components/navigationHomePages';

const HomeStack = createNativeStackNavigator();

export const HomeStackContainer = () => {
  return (
    <HomeStack.Navigator initialRouteName={navigationStacks.home}>
      <HomeStack.Screen
        name={navigationStacks.home}
        component={HomeScreen}
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
