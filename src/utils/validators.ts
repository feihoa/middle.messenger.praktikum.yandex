type Value = string | number | symbol | null | undefined | File;

export const Validators = {
  required: (value: Value) => value !== null && value !== undefined && value !== "" ? null : 'Данное поле не может быть пустым',
  min: (num: number) => (value: Value) => String(value).length >= num ? null : `Должно быть более ${num} символов`,
  max: (num: number) => (value: Value) => String(value).length <= num ? null : `Должно быть не более ${num} символов`,
  //eslint-disable-next-line 
  email: (value: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? null : `Неверный формат почты`,
  //eslint-disable-next-line
  name: (value: string) => /^[A-ZА-Я][a-zA-Zа-яА-Я\-]*$/.test(value) ? null : `Неверный формат имени`,
  login: (value: string) => /^(?!^\d+$)[\d-_A-Za-z]+$/.test(value) ? null : `Неверный формат логина`,
  phone: (value: string) => /^\+?\d+$/.test(value) ? null : `Неверный формат телефона`,
  password: (value: string) => /^(?=.*[A-Z])(?=.*\d).+$/.test(value) ? null : `Неверный формат пароля`,
}
