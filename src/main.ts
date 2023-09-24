import Handlebars, { Template } from 'handlebars';
import * as Components from './components';
import { registerComponent } from './utils/registerComponent';
import { navigate } from './utils/navigate';
import './utils/helpers';
import "../index.less";


Object.entries(Components).forEach(([name, component]) => {
  if (typeof component === 'string') {
    Handlebars.registerPartial(name, component as Template);
  } else {
    registerComponent(name, component);
  }
});

document.addEventListener('DOMContentLoaded', () => navigate('auth'));
