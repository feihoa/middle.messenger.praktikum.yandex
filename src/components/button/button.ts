import Block, { IPropsBase } from '../../utils/Block';
import button from './button.hbs?raw';


interface IProps extends IPropsBase {
  type: 'submit' | '';
  class: string;
  label: string;
  id?: string;
  onClick: () => void;
}

export class Button extends Block<IProps> {
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
