import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {navigationStacks} from './components/navigationStacks';
import {RegistrationScreen} from '../core/RegistrationScreen';
import {HomeStackContainer} from './stacks/HomeStackContainer';
import {useTypedSelector} from '../hooks/useTypedSelector';

const RootStack = createNativeStackNavigator();

export const RootStackContainer = () => {
  const isLogined = useTypedSelector(state => state.user.isLogined);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={
          isLogined ? navigationStacks.home : navigationStacks.registration
        }>
        <RootStack.Screen
          name={navigationStacks.registration}
          component={RegistrationScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name={navigationStacks.home}
          component={HomeStackContainer}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
