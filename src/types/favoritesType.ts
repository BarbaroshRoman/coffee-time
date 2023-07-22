import {ICafeInfo, IProductBriefInfo} from '../core/api/CoffeeRequest';

export enum favoritesActionTypes {
  ADD_DRINK = 'ADD_DRINK',
  REMOVE_DRINK = 'REMOVE_DRINK',
  ADD_CAFE = 'ADD_CAFE',
  REMOVE_CAFE = 'REMOVE_CAFE',
}

interface IAddDrinkAction {
  type: favoritesActionTypes.ADD_DRINK;
  payload: IProductBriefInfo;
}

interface IRemoveDrinkAction {
  type: favoritesActionTypes.REMOVE_DRINK;
  payload: string;
}

interface IAddCafeAction {
  type: favoritesActionTypes.ADD_CAFE;
  payload: ICafeInfo;
}

interface IRemoveCafeAction {
  type: favoritesActionTypes.REMOVE_CAFE;
  payload: string;
}

export type favoritesAction =
  | IAddDrinkAction
  | IRemoveDrinkAction
  | IAddCafeAction
  | IRemoveCafeAction;
