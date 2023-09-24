import Block from "../../utils/Block";
import error from './error.hbs?raw';


interface IProps {
  code: number;
  text: string;
}

export class Error extends Block {
  constructor(props: IProps) {
    super(props);
  }

  protected render(): string {
    return error;
  }
}
