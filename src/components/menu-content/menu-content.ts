import Block, { IPropsBase } from '../../utils/Block';
import menuContent from './menu-content.hbs?raw';

interface IProps extends IPropsBase {
  onAdd: () => void;
  onRemove: () => void;
  onOpen: (e: Event) => void;
}

export class MenuContent extends Block<IProps> {

  openState: boolean = false;

  constructor(props: IProps) {
    super({
      ...props,
      onOpen: (event: Event) => {
        event.preventDefault();

        if (this.openState) {
          this.hide();
          this.openState = false;
        } else {
          this.show();
          this.openState = true;
        }    
      },
    })
    this.props.events = {
      onAdd: () => props.onAdd(),
      onRemove: () => props.onRemove(),
    }
  }

  protected render(): string {
    return menuContent;
  }

  show() {
    this.hide();
    this.element?.classList.add('opened');
  }

  hide() {
    this.element?.classList.remove('opened');
  }
}
