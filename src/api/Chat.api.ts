import { HTTPTransport } from './HTTPTransport';

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
  async create(title: string) {
    return chatApi.post('/', { data: { title } });
  }

  async getChats() {
    return chatApi.get('');
  }

  async getChatNewMessagesCount(chatId: string) {
    return chatApi.get(`/new/${chatId}`);
  }

  async delete(chatId: string) {
    return chatApi.delete('/', { data: { chatId } });
  }

  async addUsersToChat(userId: string, chatId: string) {
    return chatApi.put('/users', { data: { users: [userId], chatId } });
  }

  async deleteUsersFromChat(userId: string, chatId: string) {
    return chatApi.delete('/users', { data: { users: [userId], chatId } });
  }

  async getChatToken(chatId: string) {
    return chatApi.post(`/token/${chatId}`);
  }

}
