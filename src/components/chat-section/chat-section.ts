import Block, { IPropsBase } from '../../utils/Block';
import chatSection from './chat-section.hbs?raw';


interface IProps extends IPropsBase {
  validate: Record<string, (v: string) => void>;
  onMessage: (e: Event) => void;
  currentChatId: string;
  value: string;
  onAdd: () => void;
  onRemove: () => void;
}

export class ChatSection extends Block<IProps> {
  constructor(props: IProps) {
    super(props);
    this.props.events = {
      onAdd: () => props.onAdd(),
      onRemove: () => props.onRemove(),
    }
  }
  
  protected render(): string {
    return chatSection;
  }
}
