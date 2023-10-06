import * as Pages from '../pages';

export const pages: { [key: string]: typeof Pages[keyof typeof Pages] } = {
  'auth': Pages.AuthPage,
  'register': Pages.RegisterPage,
  '404': Pages.Error404Page,
  '500': Pages.Error500Page,
  'profile': Pages.ProfilePage,
  'main': Pages.MainPage,
};
