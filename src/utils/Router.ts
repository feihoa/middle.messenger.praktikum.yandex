import { Route } from './Route';
import { pages } from './pages';


class Router {

  history: any = [];
  routes: Route[] = [];
  private _currentRoute: any | null;
  static __instance: any;
  private _rootQuery: 'app' | undefined;

  constructor(rootQuery: 'app') {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: unknown) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery || 'app' });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = event => {
      this._onRoute((<any>event.currentTarget!).location.pathname);
    }

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

const router = new Router('app');

for (const key in pages) {
  router.use(key, pages[key]);
}

router.start();

export { router };
