import Block from "../../utils/Block";
import chatList from './chat-list.hbs?raw';


export class ChatList extends Block<Record<string, never>> {
  protected render(): string {
    return chatList;
  }
}
