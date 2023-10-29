import Block from '../../utils/Block';
import { Validators } from '../../utils/validators';
import uploadModal from './upload-modal.hbs?raw';

interface IProps {
  onChange: () => void;
  closePopup: (e: Event) => void;
  onSave: (e: Event) => void;
  validate: Record<string, (v: File) => void>;
  onImageUpload: (e: Event, formData: FormData) => Promise<unknown>;
}

export class UploadModal extends Block<IProps> {
  file?: Element;

  constructor(props: IProps) {
    super({
      ...props,
      onChange: () => {
        const value = this.refs.imageFile.element?.firstElementChild;
        if (value) {
          this.refs.imageFile.setProps({ text: 'Успешно загружено' });
          this.file = value;
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

      onSave: (e: Event) => {
        e.preventDefault();

        const imageFile = (<HTMLInputElement>this.file)?.files?.[0];
        if (!imageFile) {
          this.refs.errorLine.setProps({ error: 'Данное поле не может быть пустым' })
          return;
        }
        const formData = new FormData();
        formData.append('avatar', imageFile);

        props.onImageUpload(e, formData)
          .then(() => {
            this.clear();
            this.hide();
          })
          .catch(error => this.refs.errorLine.setProps({ error }));
      },
    });

    this.hide();
  }

  clear() {
    (<HTMLInputElement>this.refs.imageFile!.element)!.value = '';
  }

  protected render(): string {
    return uploadModal;
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

}
