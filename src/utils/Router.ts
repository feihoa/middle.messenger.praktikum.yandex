import Block from './Block';
import { Route } from './Route';
import { pages } from './pages';


class Router {

  history?: History;
  routes: Route[] = [];
  private _currentRoute?: Route | null;
  static __instance: Router;
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

  use(pathname: string, block: Block<Record<string, unknown>>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery || 'app' });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window)?.location.pathname);
    };

    setTimeout(() => this._onRoute(location.pathname));
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

  go(pathname: string, reload?: boolean) {
    this.history!.pushState({}, '', pathname);
    this._onRoute(pathname);
    if (reload) {
      location.reload();
    }
  }

  back() {
    this.history?.back()
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }

}

const router = new Router('app');

for (const key in pages) {
  router.use(key, pages[key] as unknown as Block<Record<string, unknown>>);
}

router.start();

export { router };
