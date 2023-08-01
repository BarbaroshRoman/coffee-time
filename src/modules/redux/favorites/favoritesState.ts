import {IProductBriefInfo} from '../../../core/api/CoffeeRequest';
import {INewCafeInfo} from '../../../common/helpers/replaceCafeList';

export interface IFavoritesState {
  cafe: INewCafeInfo[];
  drinks: IProductBriefInfo[];
}

export const favoritesState: IFavoritesState = {
  cafe: [],
  drinks: [],
};
