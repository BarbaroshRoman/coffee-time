import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IUserRequest} from '../../types/userRequestType';

export const userRequest = createApi({
  reducerPath: 'userRequest',
  baseQuery: fetchBaseQuery({baseUrl: 'http://ci2.dextechnology.com:8000'}),
  endpoints: build => ({
    register: build.mutation<string | null, IUserRequest>({
      query: (data: IUserRequest) => ({
        url: '/api/User/Register',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(data),
      }),
    }),
    authorization: build.mutation<string | null, IUserRequest>({
      query: (data: IUserRequest) => ({
        url: '/api/User/Authorization',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(data),
      }),
    }),
  }),
});

export const {useRegisterMutation, useAuthorizationMutation} = userRequest;
