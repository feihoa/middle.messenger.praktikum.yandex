import { InputField } from "../../components";
import Block from "../../utils/Block";
import { Validators } from "../../utils/validators";
import changePasswordModal from './change-password-modal.hbs?raw';


export class ChangePasswordModal extends Block {
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
        
        const formData: {[key: string]: string} = {};
        for (const ref in this.refs) {
          if (Object.prototype.hasOwnProperty.call(this.refs, ref)) {
            formData[ref] = (<InputField>this.refs[ref]).value();
          }
        }

        if (this.hasWrongValues(formData)) {
          return;
        }
        this.hide();
      }
    });
    this.hide();
  }

  protected render(): string {
    return changePasswordModal;
  }
}