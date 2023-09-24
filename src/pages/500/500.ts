import Block from "../../utils/Block";
import error500 from './500.hbs?raw';


export class Error500Page extends Block {

  protected render(): string {
    return error500;
  }
}
