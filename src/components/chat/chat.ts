import Block, { IPropsBase } from '../../utils/Block';
import chat from './chat.hbs?raw';


interface IProps extends IPropsBase {
  onClick: (e: Event) => void;
  currentChatId: string;
}

export class Chat extends Block<IProps> {
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
