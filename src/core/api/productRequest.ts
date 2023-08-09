import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {
  IProductBriefInfo,
  IProductFullInfo,
  IProductRequest,
} from '../../types/productTypes';
import {replaceLinksForProductScreen} from '../../common/helpers/replaceLinksForProductScreen';
import {ICafeRequest} from '../../types/cafeTypes';
import {replaceProductsLinks} from '../../common/helpers/replaceProductsLinks';

export const productRequest = createApi({
  reducerPath: 'productRequest',
  baseQuery: fetchBaseQuery({baseUrl: 'http://ci2.dextechnology.com:8000'}),
  endpoints: build => ({
    getProduct: build.mutation<IProductFullInfo, IProductRequest>({
      query: (data: IProductRequest) => ({
        url: '/api/Product/GetProduct',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(data),
      }),
      transformResponse: (response: IProductFullInfo) => {
        return replaceLinksForProductScreen(response);
      },
    }),
    getProductsCafe: build.mutation<IProductBriefInfo[], ICafeRequest>({
      query: (cafe: ICafeRequest) => ({
        url: '/api/Product/GetProductsCafe',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(cafe),
      }),
      transformResponse: (response: IProductBriefInfo[]) => {
        return replaceProductsLinks(response);
      },
    }),
  }),
});

export const {useGetProductMutation, useGetProductsCafeMutation} =
  productRequest;
