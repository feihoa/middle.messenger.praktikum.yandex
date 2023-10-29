import { HOST } from './../../constants';
import { InputField } from '../../components';
import { EditProfile, User } from '../../types';
import { changeProfileData } from '../../services.ts/user.service';
import Block from '../../utils/Block';
import { StoreEvents, store } from '../../utils/Store';
import { convertKeyToCamelCaseString } from '../../utils/convertKeysToCamelCase';
import { Validators } from '../../utils/validators';
import profile from './profile.hbs?raw';
import { getUser, logout } from '../../services.ts/auth.service';

interface IProps {
  validate: Record<string, (v: string) => void>;
  onOpenPopupClick: (event: Event) => void;
  onUploadIcon: (event: Event) => void;
  onSaveInfo: (event: Event) => void;
  onLogOut: (event: Event) => void;
}

export class ProfilePage extends Block<IProps> {

  userName: string = '';

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

      onLogOut: (event: Event) => {
        event.preventDefault();

        logout();
      },

      onSaveInfo: (event: Event) => {
        event.preventDefault();

        const formData: { [key: string]: string } = {};
        for (const ref in this.refs) {
          if (Object.prototype.hasOwnProperty.call(this.refs, ref) && ref.includes('Input')) {
            formData[this.refs[ref].name as keyof EditProfile] = (this.refs[ref] as unknown as InputField).value();
          }
        }

        if (this.hasWrongValues(formData)) {
          return;
        }

        changeProfileData(formData as EditProfile).catch(error => this.refs.errorLine.setProps({ error }));
      }

    });

    this.fillUserData();
    store.on(StoreEvents.Updated, this.fillUserData.bind(this));
  }

  async fillUserData() {
    let user = store.getState().user as User;

    if (!user) {
      user = await getUser() as User;
    }

    setTimeout(() => document.getElementById('username')!.textContent = user.firstName);

    for (const ref in this.refs) {
      if (Object.prototype.hasOwnProperty.call(this.refs, ref) && ref.includes('Input')) {
        this.refs[ref].setProps({ val: user[convertKeyToCamelCaseString(this.refs[ref].name ?? '') as keyof User] });
      }
    }

    if (user.avatar) {
      this.refs.avatar.setProps({ src: `${HOST}/resources${user.avatar}` });
    }
  }

  protected render(): string {
    return profile;
  }

  componentWillUnmount(): void {
    store.off(StoreEvents.Updated, this.fillUserData.bind(this));
  }
}
