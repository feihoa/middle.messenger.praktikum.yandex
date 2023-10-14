import Block from './Block';
import isEqual from './isEqual';
import render from './render';


export class Route {

  _pathname: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _blockClass: any;
  _block: Block<Record<string, unknown>> | null;
  _props: {rootQuery: 'app'};

  constructor(pathname: string, view: Block<Record<string, unknown>>, props: {rootQuery: 'app'}) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (!this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block!);
      return;
    }

    this._block!.show();
  }

}
