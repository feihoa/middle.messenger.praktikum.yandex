import Block from "../../utils/Block";
import { navigate } from "../../utils/navigate";
import link from './link.hbs?raw';


interface IProps {
  class: string;
  label: string;
  page: string;
  onClick?: () => void;
}

export class Link extends Block {
  constructor(props: IProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick ?? this.onClick.bind(this),
    }
  }

  protected render(): string {
    return link;
  }

  private onClick() {
    navigate(this.props.page);
  }
}
