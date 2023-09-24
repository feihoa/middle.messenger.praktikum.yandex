import { InputField } from "../../components";
import Block from "../../utils/Block";
import { Validators } from "../../utils/validators";
import removeAddUserModal from './remove-add-user-modal.hbs?raw';


interface IProps {
  title: string;
  btnLabel: string;
}

export class RemoveAddUserModal extends Block {
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
        
        const login = (<InputField>this.refs.login).value();

        if (!login) {
          return;
        }

        console.log({
          login,
        })
        this.hide();
      }
    });
    this.hide();
  }

  protected render(): string {
    return removeAddUserModal;
  }
}
