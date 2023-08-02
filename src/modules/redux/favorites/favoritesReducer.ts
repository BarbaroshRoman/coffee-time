import {createSlice} from '@reduxjs/toolkit';

import {favoritesState} from './favoritesState';

const favoritesSlice = createSlice({
  name: 'Favorites',
  initialState: favoritesState,
  reducers: {
    addDrink(state, action: ) {
      state.drinks.push(action.payload);
    },
    removeDrink(state, action) {
      const drinkId = action.payload;
      state.drinks = [...state.drinks].filter(el => el.id !== drinkId);
    },
    addCafe(state, action) {
      const updateCafe = action.payload;
      updateCafe.favorite = true;
      state.cafe.push(updateCafe);
    },
    removeCafe(state, action) {
      const cafeId = action.payload;
      state.cafe = [...state.cafe].filter(el => el.id !== cafeId);
    },
  },
});

export const {addDrink, removeDrink, addCafe, removeCafe} =
  favoritesSlice.actions;

export const {reducer: favoritesReducer} = favoritesSlice;
