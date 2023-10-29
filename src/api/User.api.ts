import { ChangePassword, EditProfile } from '../types';
import { HTTPTransport } from './HTTPTransport';

const userApi = new HTTPTransport('/user');

export default class UserApi {

  async getUserById(userId: string) {
    return userApi.get(`/${userId}`);
  }

  async searchUsers(login: string) {
    return userApi.post('/search', { data: { login } });
  }

  async changeProfileData(data: EditProfile) {
    return userApi.put('/profile', { data });
  }

  async changeProfileAvatar(file: FormData) {
    return userApi.put('/profile/avatar', { file });
  }

  async changePassword(data: ChangePassword) {
    return userApi.put('/password', { data });
  }

}
