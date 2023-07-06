import {IUserState, userState} from './userState';
import {UserAction, UserActionTypes} from '../../../../types/userType';

export const userReducer = (
  state = userState,
  action: UserAction,
): IUserState => {
  switch (action.type) {
    case UserActionTypes.REGISTRATION_USER_PENDING:
      return {
        ...state,
        sessionId: '',
        email: '',
        password: '',
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
        isLogined: true,
        loading: false,
        error: null,
      };
    case UserActionTypes.REGISTRATION_USER_ERROR:
      return {
        ...state,
        sessionId: '',
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

interface IRegistrationUserSuccessAction {
  sessionId: string | null;
  email: string;
  password: string;
}

export const registrationUserPending = () => ({
  type: UserActionTypes.REGISTRATION_USER_PENDING,
});
export const registrationUserSuccess = (
  payload: IRegistrationUserSuccessAction,
) => ({
  type: UserActionTypes.REGISTRATION_USER_SUCCESS,
  payload,
});
export const registrationUserError = (payload: string) => ({
  type: UserActionTypes.REGISTRATION_USER_ERROR,
  payload,
});
