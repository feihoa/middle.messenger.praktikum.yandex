import { InputField } from '../inputField';
import Block, { IPropsBase } from '../../utils/Block';
import chatListSection from './chat-list-section.hbs?raw';
import { Chat } from '../../types';


interface IProps extends IPropsBase {
  onSearch: (e: Event) => void;
  onAddChat: () => void;
  onChatClick: (e: Event, id: string) => void;
  chats: Chat[];
  currentChatId: string;
}

export class ChatListSection extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      onSearch: (event: Event) => {
        event.preventDefault();

        const search = (this.refs.search as unknown as InputField).value();

        console.log({
          search,
        })
      },
      onChatClick: (e: Event, id: string) => props.onChatClick(e, id),
    });
    this.props.events = {
      onAddChat: () => props.onAddChat(),
    }
  }

  protected render(): string {
    return chatListSection;
  }
}
