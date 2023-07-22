export enum UserActionTypes {
  USER_PENDING = 'USER_PENDING',
  REGISTRATION_USER_SUCCESS = 'REGISTRATION_USER_SUCCESS',
  REGISTRATION_USER_ERROR = 'REGISTRATION_USER_ERROR',
  SAVE_USER_DATA = 'SAVE_USER_DATA',
  USER_LOGOUT = 'USER_LOGOUT',
}

export interface IUserSuccessPayload {
  sessionId: string | null;
  email: string;
  password: string;
  isLogined: boolean;
}

export interface IUserDataPayload {
  userName: string;
  avatar: string;
}

interface IUserPendingAction {
  type: UserActionTypes.USER_PENDING;
}

interface IUserSuccessAction {
  type: UserActionTypes.REGISTRATION_USER_SUCCESS;
  payload: IUserSuccessPayload;
}

interface IUserErrorAction {
  type: UserActionTypes.REGISTRATION_USER_ERROR;
  payload: string;
}

interface IUserDataAction {
  type: UserActionTypes.SAVE_USER_DATA;
  payload: IUserDataPayload;
}

interface IUserLogout {
  type: UserActionTypes.USER_LOGOUT;
}

export type UserAction =
  | IUserPendingAction
  | IUserSuccessAction
  | IUserErrorAction
  | IUserDataAction
  | IUserLogout;
