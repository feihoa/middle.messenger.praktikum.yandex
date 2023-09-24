import { InputField } from "../inputField";
import Block from "../../utils/Block";
import chatListSection from './chat-list-section.hbs?raw';


export class ChatListSection extends Block {
  constructor() {
    super({
      onSearch: (event: Event) => {
        event.preventDefault();

        const search = (<InputField>this.refs.search).value();

        console.log({
          search,
        })
      }
    });
  }

  protected render(): string {
    return chatListSection;
  }
}
