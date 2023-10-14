import * as Pages from '../pages';

export const pages: { [key: string]: typeof Pages[keyof typeof Pages] } = {
  '/': Pages.AuthPage,
  '/sign-up': Pages.RegisterPage,
  '/404': Pages.Error404Page,
  '/500': Pages.Error500Page,
  '/settings': Pages.ProfilePage,
  '/messenger': Pages.MainPage,
};
