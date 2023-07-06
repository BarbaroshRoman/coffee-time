export interface IUserState {
  sessionId: string;
  email: string;
  password: string;
  isLogined: boolean;
  loading: boolean;
  error: null | string;
}

export const userState: IUserState = {
  sessionId: '',
  email: '',
  password: '',
  isLogined: false,
  loading: false,
  error: null,
};
