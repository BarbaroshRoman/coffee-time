import {createSlice} from '@reduxjs/toolkit';

import {userState} from './userState';
import {
  IUserDataAction,
  IUserRegistrationAction,
} from '../../../types/userTypes';

const userSlice = createSlice({
  name: 'User',
  initialState: userState,
  reducers: {
    loadingUser(state) {
      state.isLoading = true;
    },
    registrationUser(state, action: IUserRegistrationAction) {
      state.sessionId = action.payload.sessionId;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isLogined = action.payload.isLogined;
      state.isLoading = false;
    },
    saveUserData(state, action: IUserDataAction) {
      state.userName = action.payload.userName;
      state.avatar = action.payload.avatar;
      state.isLoading = false;
    },
    userLogout(state) {
      state.sessionId = '';
      state.email = '';
      state.password = '';
      state.userName = '';
      state.avatar = '';
      state.isLogined = false;
      state.isLoading = false;
    },
  },
});

export const {loadingUser, registrationUser, saveUserData, userLogout} =
  userSlice.actions;

export const {reducer: userReducer} = userSlice;
