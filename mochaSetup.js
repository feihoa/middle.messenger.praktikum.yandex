import {JSDOM} from 'jsdom';

const jsdom = new JSDOM('<body></body>');

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.location = jsdom.window.location;
global.history = jsdom.window.history;

jsdom.reconfigure({
  url: "http://localhost"
});
