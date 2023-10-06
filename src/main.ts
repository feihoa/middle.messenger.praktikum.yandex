import Handlebars, { Template } from 'handlebars';
import * as Components from './components';
import { registerComponent } from './utils/registerComponent';
import './utils/helpers';
import "../index.less";
import Block from './utils/Block';
import { router } from './utils/Router';


Object.entries(Components).forEach(([name, component]) => {
  if (typeof component === 'string') {
    Handlebars.registerPartial(name, component as Template);
  } else {
    registerComponent(name, component as typeof Block);
  }
});

document.addEventListener('DOMContentLoaded', () => router.go('auth'));
