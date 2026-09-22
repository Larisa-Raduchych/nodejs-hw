# Notes API

Простий REST API для роботи з колекцією нотаток на Node.js та Express.

## Технології

- Node.js
- Express
- cors
- dotenv
- pino-http

## Встановлення

```bash
npm install
```

## Запуск

```bash
npm run dev    # режим розробки з nodemon
npm start      # звичайний запуск
```

## Змінні оточення

Створіть файл `.env` у корені проєкту:

```
PORT=3000
```

## Маршрути

- `GET /notes` — отримати всі нотатки
- `GET /notes/:noteId` — отримати нотатку за id
- `GET /test-error` — тестовий маршрут для перевірки обробки помилок

## Деплой

Посилання на Render: https://nodejs-hw-ek9q.onrender.com

