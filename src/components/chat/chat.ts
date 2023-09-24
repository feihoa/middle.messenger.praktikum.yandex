import Block from "../../utils/Block";
import chat from './chat.hbs?raw';


interface IProps {
  onClick: () => void;
}

export class Chat extends Block {
  constructor(props: IProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick,
    }
  }

  protected render(): string {
    return chat;
  }
}
