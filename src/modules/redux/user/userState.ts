export interface IUserState {
  sessionId: string;
  email: string;
  password: string;
  avatar: string;
  userName: string;
  isLogined: boolean;
  isLoading: boolean;
}

export const userState: IUserState = {
  sessionId: '',
  email: '',
  password: '',
  avatar: '',
  userName: '',
  isLogined: false,
  isLoading: false,
};
