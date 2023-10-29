import Block, { IPropsBase } from '../../utils/Block';
import chatCard from './chat-card.hbs?raw';


interface IProps extends IPropsBase {
  id: string;
  title: string;
  avatar: string;
  lastMessage: string;
  unreadCount: number;
  currentChatId: string;
  onClick: (e: Event, id: string) => void;
}

export class ChatCard extends Block<IProps> {

  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: e => props.onClick(e, props.id),
      }
    })
  }

  protected render(): string {
    return chatCard;
  }
}
