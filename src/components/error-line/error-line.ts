import Block from "../../utils/Block";
import errorLine from './error-line.hbs?raw';


export class ErrorLine extends Block<Record<string, never>> {
  protected render(): string {
    return errorLine;
  }
}
