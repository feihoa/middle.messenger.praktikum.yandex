import Block from "../../utils/Block";
import main from './main.hbs?raw';

interface IProps {
  onAdd: (event: Event) => void;
  onRemove: (event: Event) => void;
}

export class MainPage extends Block<IProps> {
  constructor() {
    super({
      onAdd: (event: Event) => {
        event.preventDefault();
        this.refs.addPopup.show();
      },
      onRemove: (event: Event) => {
        event.preventDefault();
        this.refs.removePopup.show();
      },
    });
  }

  protected render(): string {
    return main;
  }
}
