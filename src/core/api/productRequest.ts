import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BaseQueryResult} from '@reduxjs/toolkit/dist/query/baseQueryTypes';

import {
  IProductFullInfo,
  IProductRequest,
} from '../../types/productRequestType';
import {replaceLinksForProductScreen} from '../../common/helpers/replaceLinksForProductScreen';

export const productRequest = createApi({
  reducerPath: 'productRequest',
  baseQuery: fetchBaseQuery({baseUrl: 'http://ci2.dextechnology.com:8000'}),
  endpoints: build => ({
    getProduct: build.mutation<IProductFullInfo | null, IProductRequest>({
      query: (data: IProductRequest) => ({
        url: '/api/Product/GetProduct',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(data),
      }),
      transformResponse: (response: BaseQueryResult<any>) => {
        return replaceLinksForProductScreen(response);
      },
    }),
  }),
});

export const {useGetProductMutation} = productRequest;
