import { Chat, User } from '../../types';
import Block from '../../utils/Block';
import { StoreEvents, store } from '../../utils/Store';
import { initChatPage } from '../../utils/initApp';
import main from './main.hbs?raw';
import { createWebSocket } from '../../services.ts/web-socket.service';
import { uploadChatAvatar } from '../../services.ts/chats.service';

interface IProps {
  onAdd: (event: Event) => void;
  onRemove: (event: Event) => void;
  onAddChat: (event: Event) => void;
  onChatClick: (event: Event, chatId: string) => void;
  onUploadIcon: (event: Event, chatId: string) => void,
  onAvatarSave: (event: Event, formData: FormData) => Promise<unknown>;
}

export class MainPage extends Block<IProps> {

  currentChatId: string = '';

  constructor() {
    super({
      onAdd: (event: Event) => {
        event.preventDefault();

        if (!this.currentChatId) {
          return;
        }

        this.refs.addPopup.setProps({ currentChatId: this.currentChatId });
        this.refs.addPopup.show();
      },
      onRemove: (event: Event) => {
        event.preventDefault();

        if (!this.currentChatId) {
          return;
        }

        this.refs.removePopup.setProps({ currentChatId: this.currentChatId });
        this.refs.removePopup.show();
      },
      onAddChat: (event: Event) => {
        event.preventDefault();
        this.refs.addChatPopup.show();
      },

      onChatClick: (event: Event, chatId: string) => {
        event.preventDefault();
        this.currentChatId = chatId;
        this.refs.chatSection.setProps({ currentChatId: chatId, avatar: (<Chat[]>store.getState().chats).find(chat => chat.id == this.currentChatId)?.avatar });
        this.refs.chatListSection.setProps({ currentChatId: chatId });
        setTimeout(() => createWebSocket(chatId, (<User>store.getState().user)));
      },

      onUploadIcon: (event: Event) => {
        event.preventDefault();
        this.refs.uploadPopup.show();
      },

      onAvatarSave: (event: Event, formData: FormData): Promise<unknown> => {
        event.preventDefault();

        return uploadChatAvatar(this.currentChatId, formData)
          .then(() => {
            initChatPage();
            this.refs.chatSection.setProps({ currentChatId: null, avatar: null });
          });
      }
    });

    store.on(StoreEvents.Updated, this.rerenderChats.bind(this));
    initChatPage();
  }

  async rerenderChats() {
    const chats = await store.getState().chats as Chat[];
    this.refs.chatListSection.setProps({ chats });
  }

  protected render(): string {
    return main;
  }

  componentWillUnmount(): void {
    store.off(StoreEvents.Updated, this.rerenderChats.bind(this));
  }
}
