import {combineReducers} from 'redux';
import {favoritesReducer} from '../../modules/redux/favorites/favoritesReducer';
import {userReducer} from '../../modules/redux/user/userReducer';
import { userRequest } from "../api/userRequest";

export const rootReducer = combineReducers({
  user: userReducer,
  favorites: favoritesReducer,
  [userRequest.reducerPath]: userRequest.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
