import {INewCafeInfo} from '../common/helpers/replaceCafeList';
import {IProductBriefInfo} from './productTypes';

export interface IAddDrinkAction {
  payload: IProductBriefInfo;
}

export interface IRemoveDrinkAction {
  payload: string;
}

export interface IAddCafeAction {
  payload: INewCafeInfo;
}

export interface IRemoveCafeAction {
  payload: string | undefined;
}
