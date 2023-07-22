import {ICafeInfo, IProductBriefInfo} from '../../../../core/api/CoffeeRequest';

export interface IFavoritesState {
  cafe: ICafeInfo[];
  drinks: IProductBriefInfo[];
}

export const favoritesState: IFavoritesState = {
  cafe: [],
  drinks: [],
};
