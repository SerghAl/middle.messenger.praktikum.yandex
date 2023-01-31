[![Netlify Status](https://api.netlify.com/api/v1/badges/3904327e-1296-4a8c-9d99-56408df82a4c/deploy-status)](https://app.netlify.com/sites/chic-sunburst-b58aa5/deploys)

### Демо

Проект на Netlify: https://chic-sunburst-b58aa5.netlify.app

### Дизайн мессенджера

Дизайн в Figmа: https://www.figma.com/file/nW7r9fME8TXq78BxTierQU/Snowball-messenger?node-id=0%3A1&t=t4OB52eyYYkxEpyp-1

В процессе верстки показалось излишне разбивать редактирование профиля на несколько страниц, поэтому решил добавить возможность редактировать профиль в пределах одной страницы

### Установка проекта

Для запуска проекта необходимо последовательно выполнить следующие команды:

- `npm install` — установка зависимостей,
- `npm run build` — сборка стабильной версии.
- `npm start` — запуск проекта,

Для разработки используются следющие команды:

- `npm run dev` — запуск проекта для разработчика.

### О мессенджере

Для генерации id используется пакет nanoid

Функционал страниц:

- Навигация:
  - Постраничная навигация реализована в верхней части страниц
- Авторизация:
  - По кнопке "Войти" проихсодит проверка полей формы с выводом содрежимого формы в консоль
  - После снятия фокуса с полей форм выполняется проверка заполнения с выводом ошибки в подсказке
- Регистрация:
  - По кнопке "Зарегистрироваться" проихсодит проверка полей формы с выводом содрежимого формы в консоль
  - После снятия фокуса с полей форм выполняется проверка заполнения с выводом ошибки в подсказке
- Чат:
  - В основном окне стоит заглушка
  - При выборе любого чата подгружаются дефолтные сообщения
  - При нажатии кнопки "Профиль" происходит переход на страницу Профиля
  - По кнопке с иконкой стрелки проихсодит проверка поля сообщения с выводом содрежимого формы в консоль
  - После снятия фокуса с поля сообщения выполняется проверка заполнения с выводом ошибки в плейсхолдер
- Профиль
  - Есть возможность смены аватара
  - При нажатии на копку "Сохранить" в разделе "Личные данные" осуществляется переход на страницу 404
  - При нажатии на копку "Сохранить" в разделе "Изменить пароль" осуществляется переход на страницу 500
  - При нажатии кнопки назад происходит переход на страницу Чата
  - По кнопке "Сохранить" проихсодит проверка полей формы с выводом содрежимого формы в консоль
  - После снятия фокуса с полей форм выполняется проверка заполнения с выводом ошибки в подсказке

### Инструменты разработки

Для единообразия стилей используется stylelint и конфигурация stylelint-config-property-sort-order-smacss

Для исправления стилей исползуется команда:
`npx stylelint '**/*.css`

Для автоматической работы плагина в VScode необходимо добавить в settings.json:
`"editor.codeActionsOnSave": {
  "source.fixAll": true
},`

Для линтинга js когда используется eslint с конфигурацией "eslint-config-airbnb-base"
