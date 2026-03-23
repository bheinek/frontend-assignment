import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {loggedOut, tokenRefreshed} from '../features/auth/authSlice';
import type {RootState} from './store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001',
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/api/refresh-token',
          method: 'POST',
          body: {refreshToken},
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const data = refreshResult.data as {accessToken: string};
        api.dispatch(tokenRefreshed({accessToken: data.accessToken}));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(loggedOut());
      }
    } else {
      api.dispatch(loggedOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Todo', 'User'],
  endpoints: () => ({}),
});
