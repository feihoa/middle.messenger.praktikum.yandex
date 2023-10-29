import Block, { IPropsBase } from '../../utils/Block';
import inputField from './input-field.hbs?raw';


interface IProps extends IPropsBase {
  inputLayoutClass?: string;
  type?: 'horizontal';
  label: string;
  name: string;
  error?: string;
  onEnter: (e: KeyboardEvent) => void;
  onBlur: (e: KeyboardEvent) => void;
  validate?: (v: string) => string;
  val?: string;
  id?: string;
}

export class InputField extends Block<IProps> {

  get error() {
    return !this.validate();
  }
  
  constructor(props: IProps) {
    super({
      ...props,
      onBlur: () => this.validate(),
    })
    this.props.events = {
      onEnter: (e: KeyboardEvent) => this.props.onEnter(e),
    }
  }
  
  value() {
    if (!this.validate()) {
      return '';
    }
    return (<HTMLInputElement>this.refs.input.element!).value;
  }

  private validate() {
    const value = (<HTMLInputElement>this.refs.input.element!).value;
    const error = this.props.validate?.(value);
    if (error) {
      this.refs.errorLine.setProps({ error });
      return false;
    }
    this.refs.errorLine.setProps({ error: null });
    return true;
  }

  protected render(): string {
    return inputField;
  }
}
