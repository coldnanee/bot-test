# Тестовое задание:

Необходимо разработать Telegram-бота на Node.js, который выполняет запросы к внешнему API. Запрос к API занимает около 3 минут, при этом API поддерживает не более 5 одновременных запросов. Если в момент запроса лимит на одновременные запросы исчерпан, необходимо добавить запрос в очередь.

## Описание функционала:

1. Бот должен принимать команду /start, после которой у пользователя появляется кнопка для отправки запроса на внешний API.
2. Если текущих активных запросов меньше 5, бот сразу отправляет запрос к API.
3. Если одновременно уже выполняется 5 запросов, новый запрос должен быть помещен в очередь и выполнен, как только освободится место.
4. После выполнения запроса бот должен уведомить пользователя о завершении обработки его запроса.
5. Если позиция в очереди обновилось, необходимо отредактировать сообщение у пользователя с новой позицией

## Запуск:

1. yarn - ставим зависимости
2. Создаем файл .env в корне проекта. Заполняем env переменные (структура переменных описана в .env.example). Токен для бота получаем в Bot_father.
3. Запускаем приложение: yarn start:dev
