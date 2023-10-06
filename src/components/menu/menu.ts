import Block, { IPropsBase } from "../../utils/Block";
import menu from './menu.hbs?raw';


interface IProps extends IPropsBase{
  onClick: () => void;
}

export class Menu extends Block<IProps> {
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
