import { InputField } from "..";
import Block from "../../utils/Block";
import { Validators } from "../../utils/validators";
import uploadModal from './upload-modal.hbs?raw';


export class UploadModal extends Block {
  constructor() {
    super({
      onChange: () => {
        const value = (<InputField>this.refs.imageFile).value();
        if (value) {
          this.refs.imageFile.setProps({ text: 'Успешно загружено' });
          (<InputField>this.refs.imageFile).value = () => value;
        }
      },
      closePopup: (event: Event) => {
        event.preventDefault();
        this.refs.imageFile.setProps({ text: 'Выбрать фото на компьютере' });
        this.clear();
        this.hide();
      },
      validate: {
        imageFile: (value: File) => Validators.required(value),
      },
      onSave: (event: Event) => {
        event.preventDefault();

        const imageFile = (<InputField>this.refs.imageFile).value();

        if (!imageFile) {
          return;
        }
        
        this.clear();
        this.hide();
      }
    });
    this.hide();
  }

  clear() {
    (<HTMLInputElement>this.refs.imageFile!.element)!.value = '';
  }

  protected render(): string {
    return uploadModal;
  }
}
