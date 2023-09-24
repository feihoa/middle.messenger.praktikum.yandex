import Block from "../../utils/Block";
import error404 from './404.hbs?raw';


export class Error404Page extends Block {

  protected render(): string {
      return error404;
  }
}
