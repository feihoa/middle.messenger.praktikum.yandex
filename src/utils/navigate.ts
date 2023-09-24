import * as Pages from '../pages';

const pages: { [key: string]: typeof Pages[keyof typeof Pages] } = {
  'auth': Pages.AuthPage,
  'register': Pages.RegisterPage,
  '404': Pages.Error404Page,
  '500': Pages.Error500Page,
  'profile': Pages.ProfilePage,
  'main': Pages.MainPage,
};

export function navigate(page: string) {
  const app = document.getElementById('app');

  const Component = pages[page];
  const component = new Component();

  app!.innerHTML = '';
  app!.appendChild(component.getContent()!);

}
