import { InputField } from "..";
import Block from "../../utils/Block";
import { Validators } from "../../utils/validators";
import uploadModal from './upload-modal.hbs?raw';

interface IProps {
  onChange: () => void;
  closePopup: (e: Event) => void;
  onSave: (e: Event) => void;
  validate: Record<string, (v: File) => void>;
}

export class UploadModal extends Block<IProps> {
  constructor() {
    super({
      onChange: () => {
        const value = (this.refs.imageFile as unknown as InputField).value();
        if (value) {
          this.refs.imageFile.setProps({ text: 'Успешно загружено' });
          (this.refs.imageFile as unknown as InputField).value = () => value;
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

        const imageFile = (this.refs.imageFile as unknown as InputField).value();

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
