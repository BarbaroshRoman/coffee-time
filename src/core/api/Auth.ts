import {UserClientRequest, UserRequest} from './CoffeeRequest';

const userRequest = new UserClientRequest();

export class Auth {
  static sessionId: string;

  static async getSessionId(): Promise<string> {
    try {
      const item = new UserRequest({
        email: 'buyskih@gmail.com',
        password: '001',
      });
      Auth.sessionId = await userRequest.authorization(item);
    } catch (e) {
      alert('Authorization failed');
    }

    return Auth.sessionId;
  }
}