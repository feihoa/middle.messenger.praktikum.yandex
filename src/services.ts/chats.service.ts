import ChatApi from '../api/Chat.api';
import { HOST } from '../constants';
import { Chat } from '../types';
import { store } from '../utils/Store';
import { isApiError } from '../utils/isApiError';


const chatApi = new ChatApi();


const getChats = async () => {
  const chats = await chatApi.getChats();
  if (isApiError(chats)) {
    throw Error(isApiError(chats) as string)
  }

  (chats as Chat[]).forEach(chat => {
    if (chat?.last_message?.time) {
      chat.last_message.time = convertDate(chat.last_message.time);
    }
    if (chat.avatar) {
      chat.avatar = `${HOST}/resources${chat.avatar}`;
    }
  });
  

  return chats as Record<string, string>;
}

const createChat = async (title: string) => {
  const createChatId = await chatApi.create(title);
  if (isApiError(createChatId)) {
    throw Error(isApiError(createChatId) as string)
  }

  const chats = await chatApi.getChats();

  store.set({ chats })
}

const deleteChat = async (chatId: string) => {
  await chatApi.delete(chatId);
  const chats = getChats();
  store.set({ chats });
}

const addUsersToChat = async (userId: string, chatId: string) => {
  await chatApi.addUsersToChat(userId, chatId);
  const chats = getChats();
  store.set({ chats });
}

const deleteUsersFromChat = async (userId: string, chatId: string) => {
  await chatApi.deleteUsersFromChat(userId, chatId);
  const chats = getChats();
  store.set({ chats });
}

const getChatToken = async (chatId: string) => {
  return chatApi.getChatToken(chatId);
}

const uploadChatAvatar = async (chatId: string, avatar: FormData) => {
  return chatApi.uploadChatAvatar(chatId, avatar);
}

export {
  createChat,
  deleteChat,
  getChats,
  addUsersToChat,
  deleteUsersFromChat,
  getChatToken,
  uploadChatAvatar,
}


const convertDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleString();
}
