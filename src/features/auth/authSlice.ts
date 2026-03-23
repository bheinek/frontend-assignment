import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  createdAt: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

const loadTokens = (): Pick<AuthState, 'accessToken' | 'refreshToken'> => {
  try {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  } catch {
    return {accessToken: null, refreshToken: null};
  }
};

const initialState: AuthState = {
  ...loadTokens(),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    credentialsSet(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user?: User;
      }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    tokenRefreshed(state, action: PayloadAction<{accessToken: string}>) {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    userSet(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    loggedOut(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const {credentialsSet, tokenRefreshed, userSet, loggedOut} = authSlice.actions;
export default authSlice.reducer;
