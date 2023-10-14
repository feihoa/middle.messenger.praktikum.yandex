import { Chat } from '../../types';
import Block, { IPropsBase } from '../../utils/Block';
import chatList from './chat-list.hbs?raw';


interface IProps extends IPropsBase {
  chats: Chat[];
  onClick: (event: Event, id: string) => void;
  currentChatId: string;
}

export class ChatList extends Block<IProps> {
  
  constructor(props: IProps) {
    super({
      ...props,
      onClick: (e, id) => props.onClick(e, id),
    });
  }

  protected render(): string {
    return chatList;
  }

}
