import Block from "../../utils/Block";
import main from './main.hbs?raw';


export class MainPage extends Block {
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
