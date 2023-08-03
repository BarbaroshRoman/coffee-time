import {INewCafeInfo} from '../../../common/helpers/replaceCafeList';
import {IProductBriefInfo} from '../../../types/productTypes';

export interface IFavoritesState {
  cafe: INewCafeInfo[];
  drinks: IProductBriefInfo[];
}

export const favoritesState: IFavoritesState = {
  cafe: [],
  drinks: [],
};
