import Block from "../../utils/Block";
import input from './input.hbs?raw';


interface IProps {
  classNames: string;
  placeholder: string;
  type: string;
  name: string;
  onBlur: () => void;
  onEnter: () => void;
  onChange: () => void;
}

export class Input extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        keydown: (e: KeyboardEvent) => e.key === 'Enter' ? props.onEnter : null,
        change: props.onChange,
      }
    })
  }

  protected render(): string {
    return input;
  }
}
