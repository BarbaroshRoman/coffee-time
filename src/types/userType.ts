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

export interface IUserSuccessAction {
  payload: IUserSuccessPayload;
}

export interface IUserDataAction {
  payload: IUserDataPayload;
}
