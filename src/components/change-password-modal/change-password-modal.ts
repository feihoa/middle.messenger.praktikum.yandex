import { InputField } from '../../components';
import { changePassword } from '../../services.ts/user.service';
import Block from '../../utils/Block';
import { Validators } from '../../utils/validators';
import changePasswordModal from './change-password-modal.hbs?raw';


interface IProps {
  closePopup: (e: Event) => void;
  onSave: (e: Event) => void;
  validate: Record<string, (v: string) => void>;
}

export class ChangePasswordModal extends Block<IProps> {
  constructor() {
    super({
      closePopup: (event: Event) => {
        event.preventDefault();
        this.hide();
      },
      validate: {
        oldPassword: (value: string) => Validators.required(value),
        password: (value: string) => Validators.required(value) || Validators.password(value),
      },
      onSave: (event: Event) => {
        event.preventDefault();


        const oldPassword = (this.refs.password as unknown as InputField);
        const newPassword = (this.refs.newPassword as unknown as InputField);
        const rePassword = (this.refs.rePassword as unknown as InputField);

        if (oldPassword.error || newPassword.error || rePassword.error) {
          if (newPassword.value() !== rePassword.value()) {
            this.refs.errorLine.setProps({ error: 'Пароли не совпадают' })
          }
          return;
        }

        changePassword({ oldPassword: oldPassword.value(), newPassword: newPassword.value() })
          .then(() => this.hide())
          .catch(error => this.refs.errorLine.setProps({ error }));
      }
    });

    this.hide();
  }

  protected render(): string {
    return changePasswordModal;
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

}
