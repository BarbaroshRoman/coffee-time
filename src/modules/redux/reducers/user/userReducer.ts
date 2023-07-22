import {IUserState, userState} from './userState';
import {
  IUserDataPayload,
  IUserSuccessPayload,
  UserAction,
  UserActionTypes,
} from '../../../../types/userType';

export const userReducer = (
  state = userState,
  action: UserAction,
): IUserState => {
  switch (action.type) {
    case UserActionTypes.USER_PENDING:
      return {
        ...state,
        sessionId: state.sessionId,
        email: state.email,
        password: state.password,
        avatar: state.avatar,
        userName: state.userName,
        isLogined: false,
        loading: true,
        error: null,
      };
    case UserActionTypes.REGISTRATION_USER_SUCCESS:
      return {
        ...state,
        sessionId: action.payload.sessionId,
        email: action.payload.email,
        password: action.payload.password,
        avatar: '',
        userName: '',
        isLogined: action.payload.isLogined,
        loading: false,
        error: null,
      };
    case UserActionTypes.REGISTRATION_USER_ERROR:
      return {
        ...state,
        sessionId: '',
        email: '',
        password: '',
        userName: '',
        avatar: '',
        isLogined: false,
        loading: false,
        error: action.payload,
      };
    case UserActionTypes.SAVE_USER_DATA:
      return {
        ...state,
        sessionId: state.sessionId,
        email: state.email,
        password: state.password,
        userName: action.payload.userName,
        avatar: action.payload.avatar,
        isLogined: true,
        loading: false,
        error: null,
      };
    case UserActionTypes.USER_LOGOUT:
      return {
        ...state,
        sessionId: '',
        email: '',
        password: '',
        userName: '',
        avatar: '',
        isLogined: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const userPending = () => ({
  type: UserActionTypes.USER_PENDING,
});
export const registrationUserSuccess = (payload: IUserSuccessPayload) => ({
  type: UserActionTypes.REGISTRATION_USER_SUCCESS,
  payload,
});
export const registrationUserError = (payload: string) => ({
  type: UserActionTypes.REGISTRATION_USER_ERROR,
  payload,
});
export const authorizationUserSuccess = (payload: IUserSuccessPayload) => ({
  type: UserActionTypes.REGISTRATION_USER_SUCCESS,
  payload,
});
export const authorizationUserError = (payload: string) => ({
  type: UserActionTypes.REGISTRATION_USER_ERROR,
  payload,
});
export const saveUserData = (payload: IUserDataPayload) => ({
  type: UserActionTypes.SAVE_USER_DATA,
  payload,
});
export const userLogOut = () => ({
  type: UserActionTypes.USER_LOGOUT,
});
