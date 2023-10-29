import Handlebars, { Template } from 'handlebars';
import * as Components from './components';
import { registerComponent } from './utils/registerComponent';
import './utils/helpers';
import '../index.less';
import Block from './utils/Block';
import { initApp } from './utils/initApp';
import { Router } from './utils/Router';
import { pages } from './utils/pages';

Object.entries(Components).forEach(([name, component]) => {
  if (typeof component === 'string') {
    Handlebars.registerPartial(name, component as Template);
  } else {
    registerComponent(name, component as typeof Block);
  }
});

initApp(location.pathname);

const router = new Router('app');

for (const key in pages) {
  router.use(key, pages[key] as typeof Block<Record<string, unknown>>);
}

router.start();

export { router };
