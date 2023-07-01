export interface IuserState {
  email: string;
  password: string;
  isLogined: boolean;
  loading: boolean;
  error: null | string;
}

export const userState: IuserState = {
  email: '',
  password: '',
  isLogined: false,
  loading: false,
  error: null,
};
