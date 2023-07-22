export interface IUserState {
  sessionId: string | null;
  email: string;
  password: string;
  avatar: string;
  userName: string;
  isLogined: boolean;
  loading: boolean;
  error: null | string;
}

export const userState: IUserState = {
  sessionId: '',
  email: '',
  password: '',
  avatar: '',
  userName: '',
  isLogined: false,
  loading: false,
  error: null,
};
