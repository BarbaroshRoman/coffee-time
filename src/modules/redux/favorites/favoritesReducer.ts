import {createSlice} from '@reduxjs/toolkit';

import {favoritesState} from './favoritesState';
import {
  IAddCafeAction,
  IAddDrinkAction,
  IRemoveCafeAction,
  IRemoveDrinkAction,
} from '../../../types/favoritesTypes';

const favoritesSlice = createSlice({
  name: 'Favorites',
  initialState: favoritesState,
  reducers: {
    addDrink(state, action: IAddDrinkAction) {
      state.drinks.push(action.payload);
    },
    removeDrink(state, action: IRemoveDrinkAction) {
      const drinkId = action.payload;
      state.drinks = [...state.drinks].filter(el => el.id !== drinkId);
    },
    addCafe(state, action: IAddCafeAction) {
      const updateCafe = action.payload;
      updateCafe.favorite = true;
      state.cafe.push(updateCafe);
    },
    removeCafe(state, action: IRemoveCafeAction) {
      const cafeId = action.payload;
      state.cafe = [...state.cafe].filter(el => el.id !== cafeId);
    },
  },
});

export const {addDrink, removeDrink, addCafe, removeCafe} =
  favoritesSlice.actions;

export const {reducer: favoritesReducer} = favoritesSlice;
