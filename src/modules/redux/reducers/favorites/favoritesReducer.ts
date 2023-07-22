import {favoritesState, IFavoritesState} from './favoritesState';
import {
  favoritesAction,
  favoritesActionTypes,
} from '../../../../types/favoritesType';
import {ICafeInfo, IProductBriefInfo} from '../../../../core/api/CoffeeRequest';

export const favoritesReducer = (
  state = favoritesState,
  action: favoritesAction,
): IFavoritesState => {
  switch (action.type) {
    case favoritesActionTypes.ADD_DRINK:
      return {
        ...state,
        drinks: [...state.drinks, action.payload],
        cafe: state.cafe,
      };
    case favoritesActionTypes.REMOVE_DRINK:
      const drinkId = action.payload;
      const newDrinkList = state.drinks.filter(el => el.id !== drinkId);
      return {
        ...state,
        drinks: newDrinkList,
        cafe: state.cafe,
      };
    case favoritesActionTypes.ADD_CAFE:
      return {
        ...state,
        drinks: state.drinks,
        cafe: [...state.cafe, action.payload],
      };
    case favoritesActionTypes.REMOVE_CAFE:
      const cafeId = action.payload;
      const newCafeList = state.cafe.filter(el => el.id !== cafeId);
      return {
        ...state,
        drinks: state.drinks,
        cafe: newCafeList,
      };
    default:
      return state;
  }
};

export const addDrink = (payload: IProductBriefInfo) => ({
  type: favoritesActionTypes.ADD_DRINK,
  payload,
});

export const removeDrink = (payload: string) => ({
  type: favoritesActionTypes.REMOVE_DRINK,
  payload,
});

export const addCafe = (payload: ICafeInfo) => ({
  type: favoritesActionTypes.ADD_CAFE,
  payload,
});

export const removeCafe = (payload: string) => ({
  type: favoritesActionTypes.REMOVE_CAFE,
  payload,
});
