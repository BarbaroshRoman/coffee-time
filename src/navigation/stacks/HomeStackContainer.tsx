// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
//
// import {navigationStacks} from '../components/navigationStacks';
// import {HomeScreen} from '../../core/HomeScreen';
// import {CafeDetails} from '../../core/CafeDetails';
// import {navigationHomePages} from '../components/navigationHomePages';
//
// const HomeStack = createNativeStackNavigator();
//
// export const HomeStackContainer = () => {
//   return (
//     <HomeStack.Navigator initialRouteName={navigationStacks.home}>
//       <HomeStack.Screen
//         name={navigationStacks.home}
//         component={HomeScreen}
//         options={{headerShown: false}}
//       />
//       <HomeStack.Screen
//         name={navigationHomePages.details}
//         component={CafeDetails}
//         options={{headerShown: false}}
//       />
//     </HomeStack.Navigator>
//   );
// };

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator} from "@react-navigation/drawer";

import {navigationStacks} from '../components/navigationStacks';
import {HomeScreen} from '../../core/HomeScreen';
import {CafeDetails} from '../../core/CafeDetails';
import {navigationHomePages} from '../components/navigationHomePages';
import { DrawerContent } from "../../common/components/DrawerContent";

// const HomeStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const HomeStackContainer = () => {
  return (
    <Drawer.Navigator
      initialRouteName={navigationStacks.home}
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 250,
        swipeMinDistance: 20,
        // drawerInactiveTintColor: COLORS.lightBlue,
        // drawerActiveTintColor: COLORS.azure,
        drawerLabelStyle: {marginLeft: -20},
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name={navigationStacks.home}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={navigationHomePages.details}
        component={CafeDetails}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
