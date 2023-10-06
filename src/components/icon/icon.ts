import Block, { IPropsBase } from "../../utils/Block";
import icon from './icon.hbs?raw';


interface IProps extends IPropsBase {
  alt: string,
  class: string,
  src: string,
  onClick: () => void
}

export class Icon extends Block<IProps> {
  constructor(props: IProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick,
    }
  }

  protected render(): string {
    return icon;
  }
}
