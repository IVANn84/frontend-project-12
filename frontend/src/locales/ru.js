const ru = {
  translation: {
    username: 'Ваш ник',
    password: 'Пароль',
    submit: 'Войти',
    newToChat: 'Нет аккаунта ?',
    authFailed: 'Неверные имя пользователя или пароль',
    hexletChat: 'Hexlet Chat',
    logOut: 'Выйти',

    signup: {
      required: 'Обязательное поле',
      passMin: 'Не менее 6 символов',
      mustMatch: 'Пароли должны совпадать',
      username: 'Имя пользователя',
      usernameConstraints: 'От 3 до 20 символов',
      password: 'Пароль',
      confirm: 'Подтвердите пароль',
      alreadyExists: 'Такой пользователь уже существует',
      submit: 'Зарегистрироваться',
      header: 'Регистрация',
    },

    messagesCounter: {
      messages_zero: '{{count}} сообщений',
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
    },

    chat: {
      send: 'Сообщение отправлено',
      newMessagePlaceholder: 'Введите сообщение...',
      channels: 'Каналы',
    },

    channels: {
      remove: 'Удалить',
      rename: 'Переименовать',
    },

    modals: {
      addChannel: 'Добавить канал',
      removeChannel: 'Удалить канал',
      renameChannel: 'Переименовать канал',
      remove: 'Удалить',
      send: 'Oтправить',
      cancel: 'Oтменить',
      confirmSure: 'Уверены ?',
      channelName: 'Имя канала',
    },

    validation: {
      userExists: 'Такой пользователь уже существует',
      authFailed: 'Неверные имя пользователя или пароль',
      minMaxsimSymbols: 'От 3 до 20 символов',
      emptyField: 'обязательное поле',
      minLengthPassword: 'Не менее 6 символов',
      passwordMatch: 'Пароли должны совпадать',
      uniqueness: 'Должно быть уникальным',
    },
    
    notifications: {
      errMessage: 'Что то пошло не так, при отправке сообщения на сервер',
      another: 'Что то пошло не так',
      notАuthorized: 'Ошибка Авторизации',
      addChannel: 'Канал создан',
      removeChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
      errorAddChannel: 'Возникла ошибка при создании канала',
      errorRemoveChannel: 'Возникла ошибка при удалении канала',
      errorRenameChannel: 'Возникла ошибка при переименовании канала',
    },
  },
};
export default ru;
