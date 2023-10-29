import { InputField } from '../../components';
import { addUsersToChat, deleteUsersFromChat } from '../../services.ts/chats.service';
import { searchUsers } from '../../services.ts/user.service';
import Block from '../../utils/Block';
import { Validators } from '../../utils/validators';
import removeAddUserModal from './remove-add-user-modal.hbs?raw';


interface IProps {
  title: string;
  btnLabel: string;
  closePopup: (event: Event) => void;
  onSave: (event: Event) => void;
  validate: Record<string, (v: string) => void>;
  mode?: 'add';
  currentChatId: string;
}

export class RemoveAddUserModal extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      closePopup: (event: Event) => {
        event.preventDefault();
        this.hide();
      },
      validate: {
        login: (value: string) => Validators.required(value) || Validators.min(3)(value) || Validators.max(20)(value) || Validators.login(value),
      },
      onSave: (event: Event) => {
        event.preventDefault();
        
        const login = (this.refs.login as unknown as InputField).value();

        if (!login) {
          return;
        }

        const req = props.mode ? addUsersToChat : deleteUsersFromChat;

        searchUsers(login)
        .then(res => {
          if (!res.length) {
            this.refs.errorLine.setProps({ error: "Ничего не найдено" })
          } else if (res.length === 1) {
            req(res[0].id, this.props.currentChatId)
            .then(() => this.hide())
            // .catch(error => this.refs.errorLine.setProps({ error }));
          } else {
            this.refs.errorLine.setProps({ error: "Найдено несколько результатов" })
          }
        })
        // .catch(error => this.refs.errorLine.setProps({ error }));
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
