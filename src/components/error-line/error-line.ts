import Block from "../../utils/Block";
import errorLine from './error-line.hbs?raw';


export class ErrorLine extends Block {
  protected render(): string {
    return errorLine;
  }
}
