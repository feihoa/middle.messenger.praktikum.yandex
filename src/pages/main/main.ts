import { Chat, User } from '../../types';
import Block from '../../utils/Block';
import { StoreEvents, store } from '../../utils/Store';
import { initChatPage } from '../../utils/initApp';
import main from './main.hbs?raw';
import { createWebSocket } from '../../services.ts/web-socket.service';

interface IProps {
  onAdd: (event: Event) => void;
  onRemove: (event: Event) => void;
  onAddChat: (event: Event) => void;
  onChatClick: (event: Event, chatId: string) => void;
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
        this.refs.chatSection.setProps({ currentChatId: chatId });
        this.refs.chatListSection.setProps({ currentChatId: chatId });
        console.log(store)
        setTimeout(() => createWebSocket(chatId, (<User>store.getState().user)));
      },
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
