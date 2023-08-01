import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {IProductRequest} from '../../types/productRequestType';

export const favoriteRequest = createApi({
  reducerPath: 'favoriteRequest',
  baseQuery: fetchBaseQuery({baseUrl: 'http://ci2.dextechnology.com:8000'}),
  endpoints: build => ({
    set: build.mutation<boolean | null, IProductRequest>({
      query: (product: IProductRequest) => ({
        url: '/api/Favorite/Set',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(product),
      }),
    }),
    unset: build.mutation<boolean | null, IProductRequest>({
      query: (product: IProductRequest) => ({
        url: '/api/Favorite/Unset',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(product),
      }),
    }),
  }),
});

export const {useSetMutation, useUnsetMutation} = favoriteRequest;
