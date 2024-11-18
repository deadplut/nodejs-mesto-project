# Mesto Project

Mesto - это серверное приложение для работы с пользователями и карточками. Оно использует **Express.js** для построения API и **MongoDB** в качестве базы данных.

## 🚀 Запуск проекта

### 1. Установка зависимостей

После клонирования репозитория выполните команду:

```bash
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

Обязательно заполните `JWT_SECRET` своим секретным ключом.

### 3. Запуск MongoDB через Docker Compose

Если у вас нет локального экземпляра MongoDB, вы можете использовать Docker Compose.

Запустите контейнеры:

```bash
docker-compose up --build
```

- MongoDB будет доступен на порту `27017`.
- Приложение будет работать на `http://localhost:3000`.

### 4. Запуск приложения

#### В режиме разработки:

```bash
npm run dev
```

#### В режиме продакшн:

```bash
npm start
```

## 🔧 Используемые технологии

- **Node.js**: Серверная платформа.
- **Express.js**: Фреймворк для создания API.
- **MongoDB**: База данных.
- **Mongoose**: ODM для MongoDB.
- **Docker**: Изоляция окружения.
- **TypeScript**: Поддержка типизации.

## 🏩 Команды для разработки

- **Запуск в режиме разработки**:

  ```bash
  npm run dev
  ```

- **Запуск в режиме продакшн**:

  ```bash
  npm start
  ```

- **Запуск Docker Compose**:

  ```bash
  docker-compose up -d
  ```

- **Остановка контейнеров**:
  ```bash
  docker-compose down
  ```

## 📜 Лицензия

Этот проект лицензирован под [MIT License](LICENSE).
