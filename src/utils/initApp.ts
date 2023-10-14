import { unauthorizedUserRoutes } from "../constants";
import { getUser } from "../services.ts/auth.service";
import { getChats } from "../services.ts/chats.service";
import { router } from "./Router";
import { StoreEvents, store } from "./Store";


export const initApp = async (path = location.pathname) => {

  try {
    const user = await getUser();
    if (user) {
      subscribeToStore();
      store.set({ user });
    }
  } catch (error) {
    router.go(!unauthorizedUserRoutes.includes(path) ? '/' : path);
    return;
  }

  router.go(unauthorizedUserRoutes.includes(path) ? '/messenger' : path);
}

export const initChatPage = async () => {
  const chats = await getChats();
  store.set({ chats });
}

const subscribeToStore = () => {
  store.on(StoreEvents.Updated, consoleInfo);
}

export const unSubscribeFromStore = () => {
  store.off(StoreEvents.Updated, consoleInfo);
}

const consoleInfo = () => {
  console.log(store.getState());
}
