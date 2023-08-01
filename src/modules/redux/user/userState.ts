export interface IUserState {
  sessionId: string | null;
  email: string;
  password: string;
  avatar: string;
  userName: string;
  isLogined: boolean;
}

export const userState: IUserState = {
  sessionId: '',
  email: '',
  password: '',
  avatar: '',
  userName: '',
  isLogined: false,
};
