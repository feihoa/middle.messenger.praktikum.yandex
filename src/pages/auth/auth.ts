import { InputField } from "../../components";
import Block from "../../utils/Block";
import { navigate } from "../../utils/navigate";
import { Validators } from "../../utils/validators";
import auth from './auth.hbs?raw';


export class AuthPage extends Block {
  constructor() {
    super({
      validate: {
        login: (value: string) => Validators.required(value),
        password: (value: string) => Validators.required(value),
      },
      onAuth: (event: Event) => {
        event.preventDefault();

        const login = (<InputField>this.refs.login).value();
        const password = (<InputField>this.refs.password).value();

        if (this.hasWrongValues({ login, password })) {
          return;
        }

        console.log({
          login,
          password
        })
        navigate('main');
      }
    });
  }

  protected render(): string {
    return auth;
  }
}
