import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

type PagesData = { [pageName: string]: string[] };

const pages: PagesData = {
  'auth': [ Pages.AuthPage ],
  'register': [ Pages.RegisterPage ],
  '404': [ Pages.Error404Page ],
  '500': [ Pages.Error500Page ],
  'profile': [ Pages.ProfilePage ],
  'main': [ Pages.MainPage ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('auth'));

document.addEventListener('click',  e => {
  const page = (e.target as Element).getAttribute('page');
  console.log(e.target)

  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
