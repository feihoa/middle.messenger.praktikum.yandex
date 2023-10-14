import { AuthUser, CreateUser } from '../types';
import { HTTPTransport } from './HTTPTransport';

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
  async create(data: CreateUser) {
    return authApi.post('/signup', { data });
  }

  async login(data: AuthUser) {
    return authApi.post('/signin', { data });
  }

  async user() {
    return authApi.get('/user');
  }

  async logout() {
    return authApi.post('/logout')
  }
}
