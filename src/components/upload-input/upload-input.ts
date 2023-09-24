import Block from "../../utils/Block";
import uploadInput from './upload-input.hbs?raw';
import uploadImg from '../../assets/icons/attach.svg';

interface IProps {
  text?: string;
  onChange: () => void;
}

export class UploadInput extends Block {
  constructor(props: IProps) {
    super(props);
    this.props.events = {
      onEnter: (e: KeyboardEvent) => this.props.onEnter(e),
      onChange: this.props.onChange,
    }
  }

  protected render(): string {
    return uploadInput;
  }

  componentDidMount(): void {
    if (!this.props.text) {
      (<HTMLImageElement>this.element?.querySelector('.attach')).src = uploadImg;
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
    this.refs.errorLine.setProps({ error: undefined });
    return true;
  }
}
