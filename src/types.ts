//User
export type CreateUser = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export type AuthUser = {
  login: string;
  password: string;
}

export type User = {
  id: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

//Chats
export type Chat = {
  id: string;
  title: string;
  avatar: string;
  unreadCount: number;
  createdBy: string;
  lastMessage: {
    user: Partial<User>;
    time: Date;
    content: string;
  }
}

//profile
export type Profile = {
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
}

export type EditProfile = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

//password
export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
}

//error
export type APIError = {
  reason: string;
}

//message
export type MessageData = {
  chat_id: string,
  time: string,
  type: string,
  user_id: string,
  content: string,
  file?: {
      id: string,
      user_id: string,
      path: string,
      filename: string,
      content_type: string,
      content_size: number,
      upload_date: string,
  }           
}
