import { InputField } from "../inputField";
import Block from "../../utils/Block";
import chatListSection from './chat-list-section.hbs?raw';


interface IProps {
  onSearch: (e: Event) => void;
}

export class ChatListSection extends Block<IProps> {
  constructor() {
    super({
      onSearch: (event: Event) => {
        event.preventDefault();

        const search = (this.refs.search as unknown as InputField).value();

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
