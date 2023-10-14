import UserApi from '../api/User.api';
import { ChangePassword, EditProfile, User } from '../types';
import { store } from '../utils/Store';
import convertKeysToCamelCase from '../utils/convertKeysToCamelCase';
import { isApiError } from '../utils/isApiError';
import { getUser } from './auth.service';


const userApi = new UserApi();

const getUserById = async (userId: string) => {
  const user = await userApi.getUserById(userId);
  if (isApiError(user)) {
    throw Error(isApiError(user) as string)
  }

  return convertKeysToCamelCase(user as Record<string, string>);
}

const searchUsers = async (login: string) => {
  const users = await userApi.searchUsers(login);
  if (isApiError(users)) {
    throw Error(isApiError(users) as string)
  }

  return (users as User[]).map(user => convertKeysToCamelCase(user as Record<string, string>));
}

const changeProfileData = async (data: EditProfile) => {
  const response = await userApi.changeProfileData(data);
  if (isApiError(response)) {
    throw Error(isApiError(response) as string)
  }

  return response;
}

const changeProfileAvatar = async (file: FormData) => {
  const response = await userApi.changeProfileAvatar(file);
  if (isApiError(response)) {
    throw Error(isApiError(response) as string)
  }

  const user = await getUser();

  store.set({user});
  return response;
}

const changePassword = async (data: ChangePassword) => {
  const response = await userApi.changePassword(data);
  if (isApiError(response)) {
    throw Error(isApiError(response) as string)
  }

  return response;
}


export {
  changeProfileAvatar,
  changeProfileData,
  searchUsers,
  getUserById,
  changePassword,
}
