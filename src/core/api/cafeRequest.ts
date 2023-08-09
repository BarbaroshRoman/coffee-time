import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {
  INewCafeInfo,
  replaceCafeList,
} from '../../common/helpers/replaceCafeList';

export const cafeRequest = createApi({
  reducerPath: 'cafeRequest',
  baseQuery: fetchBaseQuery({baseUrl: 'http://ci2.dextechnology.com:8000'}),
  endpoints: build => ({
    getAllCafe: build.mutation<INewCafeInfo[], string>({
      query: (sessionId: string) => ({
        url: '/api/Cafe/GetAll',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(sessionId),
      }),
      transformResponse: (response: INewCafeInfo[]) => {
        return replaceCafeList(response);
      },
    }),
  }),
});

export const {useGetAllCafeMutation} = cafeRequest;
