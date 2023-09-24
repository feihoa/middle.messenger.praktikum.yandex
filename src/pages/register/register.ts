import { InputField } from "../../components";
import Block from "../../utils/Block";
import { navigate } from "../../utils/navigate";
import { Validators } from "../../utils/validators";
import register from './register.hbs?raw';


export class RegisterPage extends Block {
  constructor() {
    super({
      validate: {
        login: (value: string) => Validators.required(value) || Validators.min(3)(value) || Validators.max(20)(value) || Validators.login(value),
        email: (value: string) => Validators.required(value) || Validators.email(value),
        fname: (value: string) => Validators.required(value) || Validators.name(value),
        sname: (value: string) => Validators.required(value) || Validators.name(value),
        phone: (value: string) => Validators.required(value) || Validators.min(10)(value) || Validators.max(15)(value) || Validators.phone(value),
        password: (value: string) => Validators.required(value) || Validators.password(value),
        rePassword: (value: string) => Validators.required(value) || Validators.password(value),
      },
      onRegister: (event: Event) => {
        event.preventDefault();

        const formData: { [key: string]: string } = {};
        for (const ref in this.refs) {
          if (Object.prototype.hasOwnProperty.call(this.refs, ref)) {
            formData[ref] = (<InputField>this.refs[ref]).value();
          }
        }

        if (this.hasWrongValues(formData)) {
          return;
        }

        console.log(formData);
        navigate('auth');
      }
    });
  }

  protected render(): string {
    return register;
  }
}
