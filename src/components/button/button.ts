import Block from "../../utils/Block";
import button from './button.hbs?raw';


interface IProps {
  type: 'submit' | '',
  class: string,
  label: string,
  onClick: () => void
}

export class Button extends Block {
  constructor(props: IProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick,
    }
  }

  protected render(): string {
    return button;
  }
}
