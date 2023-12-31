import { InputField } from '../../components';
import { signin } from '../../services.ts/auth.service';
import Block from '../../utils/Block';
import { Validators } from '../../utils/validators';
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

        if (!password || !login) {
          return;
        }

        signin({ login, password })
        .then(() => {
          this.refs.login.setProps({val: ''});
          this.refs.password.setProps({val: ''});
        })
        .catch(error => this.refs.errorLine.setProps({ error }))
      }
    });
  }

  protected render(): string {
    return auth;
  }
}
