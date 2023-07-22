import {combineReducers} from 'redux';
import {userReducer} from './user/userReducer';
import {favoritesReducer} from './favorites/favoritesReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
