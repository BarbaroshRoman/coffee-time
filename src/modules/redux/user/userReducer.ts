import {createSlice} from '@reduxjs/toolkit';

import {userState} from './userState';
import {IUserDataAction, IUserSuccessAction} from '../../../types/userType';

const userSlice = createSlice({
  name: 'User',
  initialState: userState,
  reducers: {
    registrationUser(state, action: IUserSuccessAction) {
      state.sessionId = action.payload.sessionId;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isLogined = action.payload.isLogined;
    },
    saveUserData(state, action: IUserDataAction) {
      state.userName = action.payload.userName;
      state.avatar = action.payload.avatar;
    },
    userLogout(state) {
      state.sessionId = '';
      state.email = '';
      state.password = '';
      state.userName = '';
      state.avatar = '';
      state.isLogined = false;
    },
  },
});

export const {registrationUser, saveUserData, userLogout} = userSlice.actions;

export const {reducer: userReducer} = userSlice;
