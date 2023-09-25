import Block, { IPropsBase } from "../../utils/Block";
import { Validators } from "../../utils/validators";
import { InputField } from "../inputField";
import chatSection from './chat-section.hbs?raw';


interface IProps extends IPropsBase {
  validate: Record<string, (v: string) => void>;
  onMessage: (e: Event) => void;
  value: string;
  onAdd: () => void;
  onRemove: () => void;
}

export class ChatSection extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      validate: {
        message: (value: string) => Validators.required(value),
      },
      onMessage: (event: Event) => {
        event.preventDefault();

        const message = (this.refs.message as unknown as InputField).value();

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
