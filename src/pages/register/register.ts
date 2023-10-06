import { InputField } from "../../components";
import Block from "../../utils/Block";
import { router } from "../../utils/Router";
import { Validators } from "../../utils/validators";
import register from './register.hbs?raw';


interface IProps {
  validate: Record<string, (v: string) => void>;
  onRegister: (event: Event) => void;
}

export class RegisterPage extends Block<IProps> {
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
            formData[ref] = (this.refs[ref] as unknown as InputField).value();
          }
        }

        if (this.hasWrongValues(formData)) {
          return;
        }

        console.log(formData);
        router.go('auth');
      }
    });
  }

  protected render(): string {
    return register;
  }
}
