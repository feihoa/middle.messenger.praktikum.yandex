import Block, { IPropsBase } from '../../utils/Block';
import { router } from '../../utils/Router';
import link from './link.hbs?raw';


interface IProps extends IPropsBase {
  class: string;
  label: string;
  page: string;
  onClick?: () => void;
}

export class Link extends Block<IProps> {
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
    if (this.props.page !== 'back') {
      router.go(this.props.page);
    } else {
      router.back();
    }
  }
  
}
