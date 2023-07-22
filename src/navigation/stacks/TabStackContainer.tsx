import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FavoriteDrinksScreen} from '../../core/FavoriteDrinksScreen';
import {navigationFavoritePages} from '../components/navigationFavoritePages';
import {FavoriteCafeScreen} from '../../core/FavoriteCafeScreen';

const Tab = createBottomTabNavigator();

export const TabStackContainer = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={navigationFavoritePages.favoriteDrinks}
        component={FavoriteDrinksScreen}
      />
      <Tab.Screen
        name={navigationFavoritePages.favoriteCafe}
        component={FavoriteCafeScreen}
      />
    </Tab.Navigator>
  );
};
