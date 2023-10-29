import { WSS } from "../constants";
import { MessageData, User } from "../types";
import { getChatToken } from "./chats.service";


export const createWebSocket = async (chatId: string, user: User) => {
  const resp = await getChatToken(chatId) as { token: string };
  const socket = new WebSocket(`${WSS}/chats/${user.id}/${chatId}/${resp.token}`);

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');

    socket.send(JSON.stringify({
      content: 20,
      type: 'get old',
    }));

    const sendBtn = document.getElementById('send-message-button')!;
    sendBtn.addEventListener('click', () => {

      const textArea = document.getElementById('send-message-input')!;
      socket.send(JSON.stringify({
        content: (<HTMLInputElement>textArea).value,
        type: 'message',
      }));

      (<HTMLInputElement>textArea).value = ''; 
    })
  });

  socket.addEventListener('close', event => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event}`);
  });

  socket.addEventListener('message', event => {
    console.log('Получены данные', event.data);

    const data = JSON.parse(event.data) as MessageData | MessageData[];

    if (Array.isArray(data)) {
      if (data.length) {
        data.forEach(message => {
          createMessageBlock(message, user.id);
        })
      }
    } else {
      createMessageBlock(data, user.id);
    }
  });

  socket.addEventListener('error', event => {
    console.log('Ошибка', event);
  });
}

const createMessageBlock = (data: MessageData, currentUserId: string) => {
  if (!data.content || data.type === 'user connected') {
    return;
  }

  const messages = document.getElementById('messages-list')!;
  const li = document.createElement('li');

  li.classList.add('message-block')

  if (data.user_id === currentUserId) {
    li.classList.add('message-block_right')
  }
  li.innerText = data.content;

  messages.append(li);

  messages.scrollTop = messages.scrollHeight;
}
