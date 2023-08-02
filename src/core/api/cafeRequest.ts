import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BaseQueryResult} from '@reduxjs/toolkit/dist/query/baseQueryTypes';

import {
  INewCafeInfo,
  replaceCafeList,
} from '../../common/helpers/replaceCafeList';

export const cafeRequest = createApi({
  reducerPath: 'cafeRequest',
  baseQuery: fetchBaseQuery({baseUrl: 'http://ci2.dextechnology.com:8000'}),
  endpoints: build => ({
    getAllCafe: build.mutation<INewCafeInfo[] | undefined, string | null>({
      query: (sessionId: string | null) => ({
        url: '/api/Cafe/GetAll',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(sessionId),
      }),
      transformResponse: (response: BaseQueryResult<any>) => {
        return replaceCafeList(response);
      },
    }),
  }),
});

export const {useGetAllCafeMutation} = cafeRequest;
