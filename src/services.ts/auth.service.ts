import AuthApi from '../api/Auth.api';
import { router } from '../main';
import { AuthUser, CreateUser } from '../types';
import { store } from '../utils/Store';
import convertKeysToCamelCase from '../utils/convertKeysToCamelCase';
import { initApp, unSubscribeFromStore } from '../utils/initApp';
import { isApiError } from '../utils/isApiError';


const authApi = new AuthApi();

const getUser = async () => {
  const user = await authApi.user();
  if (isApiError(user)) {
    throw Error(isApiError(user) as string)
  }

  return convertKeysToCamelCase(user as Record<string, string>);
}

const signin = async (data: AuthUser) => {
  const response = await authApi.login(data);
  if (isApiError(response)) {
    throw Error(isApiError(response) as string)
  }

  const user = await getUser();

  if (store.getState().listeners) {
    store.set({user});
  }

  router.go('/messenger');
  initApp();
}

const signup = async (data: CreateUser) => {
  const response = await authApi.create(data);
  if (isApiError(response)) {
    throw Error(isApiError(response) as string)
  }

  router.go('/messenger');
  initApp();
}

const logout = async () => {
  await authApi.logout();
  
  store.clear();
  unSubscribeFromStore();
  router.go('/', true);
}

export {
  signin,
  signup,
  logout,
  getUser
}
