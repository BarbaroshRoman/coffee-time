export enum UserActionTypes {
  REGISTRATION_USER_PENDING = 'REGISTRATION_USER_PENDING',
  REGISTRATION_USER_SUCCESS = 'REGISTRATION_USER_SUCCESS',
  REGISTRATION_USER_ERROR = 'REGISTRATION_USER_ERROR',
}
interface IUserPendingAction {
  type: UserActionTypes.REGISTRATION_USER_PENDING;
}

interface IUserSuccessAction {
  type: UserActionTypes.REGISTRATION_USER_SUCCESS;
  payload: any;
}

interface IUserErrorAction {
  type: UserActionTypes.REGISTRATION_USER_ERROR;
  payload: string;
}

export type UserAction =
  | IUserPendingAction
  | IUserSuccessAction
  | IUserErrorAction;
