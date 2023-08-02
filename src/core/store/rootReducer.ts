import {combineReducers} from 'redux';
import {favoritesReducer} from '../../modules/redux/favorites/favoritesReducer';
import {userReducer} from '../../modules/redux/user/userReducer';
import {userRequest} from '../api/userRequest';
import {productRequest} from '../api/productRequest';
import {favoriteRequest} from '../api/favoriteRequest';
import { cafeRequest } from "../api/cafeRequest";

export const rootReducer = combineReducers({
  user: userReducer,
  favorites: favoritesReducer,
  [userRequest.reducerPath]: userRequest.reducer,
  [productRequest.reducerPath]: productRequest.reducer,
  [favoriteRequest.reducerPath]: favoriteRequest.reducer,
  [cafeRequest.reducerPath]: cafeRequest.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
