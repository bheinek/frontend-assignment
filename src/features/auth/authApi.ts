import {apiSlice} from '@/app/api';
import type {LoginRequest, AuthResponse, UserResponse} from './types';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMe: builder.query<UserResponse, void>({
      query: () => '/api/user/me',
      providesTags: ['User'],
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation, useGetMeQuery} = authApi;
