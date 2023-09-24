import Block from "../../utils/Block";
import icon from './icon.hbs?raw';


interface IProps {
  alt: string,
  class: string,
  src: string,
  onClick: () => void
}

export class Icon extends Block {
  constructor(props: IProps) {console.log(props.src)
    super(props);
    this.props.events = {
      click: this.props.onClick,
    }
  }

  protected render(): string {
    return icon;
  }
}
