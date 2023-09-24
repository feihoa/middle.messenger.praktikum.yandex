import { InputField } from "../../components";
import Block from "../../utils/Block";
import { Validators } from "../../utils/validators";
import profile from './profile.hbs?raw';


export class ProfilePage extends Block {
  constructor() {
    super({
      validate: {
        login: (value: string) => Validators.required(value) || Validators.min(3)(value) || Validators.max(20)(value) || Validators.login(value),
        email: (value: string) => Validators.required(value) || Validators.email(value),
        fname: (value: string) => Validators.required(value) || Validators.name(value),
        sname: (value: string) => Validators.required(value) || Validators.name(value),
        dname: (value: string) => Validators.required(value),
        phone: (value: string) => Validators.required(value) || Validators.min(10)(value) || Validators.max(15)(value) || Validators.phone(value),
      },
      onOpenPopupClick: (event: Event) => {
        event.preventDefault();
        this.refs.popup.show();
      },
      onUploadIcon: (event: Event) => {
        event.preventDefault();
        this.refs.uploadPopup.show();
      },
      onSaveInfo: (event: Event) => {
        event.preventDefault();

        const formData: { [key: string]: string } = {};
        for (const ref in this.refs) {
          if (Object.prototype.hasOwnProperty.call(this.refs, ref) && ref.includes('Input')) {
            formData[ref] = (<InputField>this.refs[ref]).value();
          }
        }

        if (this.hasWrongValues(formData)) {
          return;
        }

        console.log(formData);
      }
    });
  }

  protected render(): string {
    return profile;
  }
}
