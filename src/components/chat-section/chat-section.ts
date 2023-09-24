import Block from "../../utils/Block";
import { Validators } from "../../utils/validators";
import { InputField } from "../inputField";
import chatSection from './chat-section.hbs?raw';

interface IProps {
  onAdd: () => void;
  onRemove: () => void;
}

export class ChatSection extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      validate: {
        message: (value: string) => Validators.required(value),
      },
      onMessage: (event: Event) => {
        event.preventDefault();

        const message = (<InputField>this.refs.message).value();

        console.log({
          message,
        })
      },
    });
    this.props.events = {
      onAdd: () => props.onAdd(),
      onRemove: () => props.onRemove(),
    }
  }
  
  protected render(): string {
    return chatSection;
  }
}
