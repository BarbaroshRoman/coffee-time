import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationStacks} from './stacks/navigationStacks';
import {RegistrationScreen} from '../core/RegistrationScreen';
import {HomeScreen} from '../core/HomeScreen';

const RootStack = createNativeStackNavigator();

export const RootStackContainer = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={navigationStacks.registration}>
        <RootStack.Screen
          name={navigationStacks.registration}
          component={RegistrationScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name={navigationStacks.home}
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
