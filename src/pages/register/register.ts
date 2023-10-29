import { InputField } from '../../components';
import { signup } from '../../services.ts/auth.service';
import { CreateUser } from '../../types';
import Block from '../../utils/Block';
import { Validators } from '../../utils/validators';
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

        const formData: CreateUser = {} as CreateUser;
        for (const ref in this.refs) {
          if (Object.prototype.hasOwnProperty.call(this.refs, ref) && ref !== 'errorLine') {
            formData[this.refs[ref].name as keyof CreateUser] = (this.refs[ref] as unknown as InputField).value();
          }
        }

        if (this.hasWrongValues(formData)) {
          return;
        }

        signup(formData)
        .then(() => {
          for (const ref in this.refs) {
            if (Object.prototype.hasOwnProperty.call(this.refs, ref) && ref !== 'errorLine') {
              this.refs[ref].setProps({val: ''});
            }
          }
        })
        .catch(error => this.refs.errorLine.setProps({ error }))
      }
    });
  }

  protected render(): string {
    return register;
  }
}
