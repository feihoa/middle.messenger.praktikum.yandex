import Block from "../../utils/Block";
import menu from './menu.hbs?raw';


interface IProps {
  onClick: () => void;
}

export class Menu extends Block {
  constructor(props: IProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick,
    }
  }

  protected render(): string {
    return menu;
  }

}
