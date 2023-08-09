export interface IUserSuccessPayload {
  sessionId: string;
  email: string;
  password: string;
  isLogined: boolean;
}

interface IUserDataPayload {
  userName: string;
  avatar: string;
}

export interface IUserRegistrationAction {
  payload: IUserSuccessPayload;
}

export interface IUserDataAction {
  payload: IUserDataPayload;
}

export interface IUserRequest {
  email: string;
  password: string;
}
