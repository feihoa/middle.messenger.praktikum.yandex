import { InputField } from '..';
import { createChat } from '../../services.ts/chats.service';
import Block from '../../utils/Block';
import { Validators } from '../../utils/validators';
import removeAddUserModal from './add-chat-modal.hbs?raw';


interface IProps {
  title: string;
  btnLabel: string;
  closePopup: (event: Event) => void;
  onSave: (event: Event) => void;
  validate: Record<string, (v: string) => void>;
}

export class AddChatModal extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      closePopup: (event: Event) => {
        event.preventDefault();
        this.hide();
      },
      validate: {
        title: (value: string) => Validators.required(value),
      },
      onSave: (event: Event) => {
        event.preventDefault();

        const title = (this.refs.title as unknown as InputField).value();

        if (!title) {
          return;
        }

        createChat(title)
          .then(() => this.hide())
          .catch(error => this.refs.errorLine.setProps({ error }));
      }
    });
    this.hide();
  }

  protected render(): string {
    return removeAddUserModal;
  }

  show() {
    this.getContent()!.style.display = 'block';
  }
}
