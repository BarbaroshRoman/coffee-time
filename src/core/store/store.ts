import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createLogger} from 'redux-logger';

import {rootReducer} from './rootReducer';
import {userRequest} from '../api/userRequest';
import {productRequest} from '../api/productRequest';
import {favoriteRequest} from '../api/favoriteRequest';
import {cafeRequest} from '../api/cafeRequest';

const options = {
  diff: true,
  collapsed: true,
};

const logger = createLogger(options);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  timeout: __DEV__ ? 2000 : 1000,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      userRequest.middleware,
      productRequest.middleware,
      favoriteRequest.middleware,
      cafeRequest.middleware,
      logger,
    ),
});

export const persistor = persistStore(store);
