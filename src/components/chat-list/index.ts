import './chat-list.less';
import Handlebars from 'handlebars';
export { ChatList } from './chat-list';


Handlebars.registerHelper('chats', () => {
  return [
    { chatName: 'chat-1', author: 'author-1', message: 'message-1', time: 'time-1', unreadMessagesNumber: 1 },
    { chatName: 'chat-2', author: 'author-2', message: 'message-2', time: 'time-2', unreadMessagesNumber: 2 },
    { chatName: 'chat-3', author: 'author-3', message: 'message-3', time: 'time-3', unreadMessagesNumber: 3 },
  ]
})
