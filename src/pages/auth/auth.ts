import { InputField } from "../../components";
import Block from "../../utils/Block";
import { navigate } from "../../utils/navigate";
import { Validators } from "../../utils/validators";
import auth from './auth.hbs?raw';


interface IProps {
  validate: Record<string, (v: string) => void>;
  onAuth: (event: Event) => void;
}

export class AuthPage extends Block<IProps> {
  constructor() {
    super({
      validate: {
        login: (value: string) => Validators.required(value),
        password: (value: string) => Validators.required(value),
      },
      onAuth: (event: Event) => {
        event.preventDefault();

        const login = (this.refs.login as unknown as InputField).value();
        const password = (this.refs.password as unknown as InputField).value();

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
