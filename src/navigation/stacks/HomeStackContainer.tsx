import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {navigationStacks} from '../components/navigationStacks';
import {CafeDetailsScreen} from '../../core/CafeDetailsScreen';
import {navigationHomePages} from '../components/navigationHomePages';
import {DrawerStackContainer} from './DrawerStackContainer';
import { ProductDetailsScreen } from "../../core/ProductDetailsScreen";

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
        name={navigationHomePages.cafeDetails}
        component={CafeDetailsScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name={navigationHomePages.productDetails}
        component={ProductDetailsScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
