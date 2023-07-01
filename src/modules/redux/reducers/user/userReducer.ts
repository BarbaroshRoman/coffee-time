import {IuserState, userState} from './userState';

enum UserActionTypes {
  REGISTRATION_USER_PENDING = 'REGISTRATION_USER_PENDING',
  REGISTRATION_USER_SUCCESS = 'REGISTRATION_USER_SUCCESS',
  REGISTRATION_USER_ERROR = 'REGISTRATION_USER_ERROR',
}
interface IUserPendingAction {
  type: UserActionTypes.REGISTRATION_USER_PENDING;
}

interface IUserSuccessAction {
  type: UserActionTypes.REGISTRATION_USER_SUCCESS;
  payload: object;
}

interface IUserErrorAction {
  type: UserActionTypes.REGISTRATION_USER_ERROR;
  payload: string;
}

type UserAction = IUserPendingAction | IUserSuccessAction | IUserErrorAction;

export const userReducer = (
  state = userState,
  action: UserAction,
): IuserState => {
  switch (action.type) {
    case UserActionTypes.REGISTRATION_USER_PENDING:
      return {
        email: '',
        password: '',
        isLogined: false,
        loading: true,
        error: null,
      };
    case UserActionTypes.REGISTRATION_USER_SUCCESS:
      return {
        email: action.payload.email,
        password: action.payload.password,
        isLogined: true,
        loading: false,
        error: null,
      };
    case UserActionTypes.REGISTRATION_USER_ERROR:
      return {
        email: '',
        password: '',
        isLogined: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
