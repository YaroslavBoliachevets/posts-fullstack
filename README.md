**POSTS‑FULLSTACK**
Кратко: Full‑stack приложение для публикации постов с регистрацией/логином, подтверждением по email и JWT‑аутентификацией (access + refresh). Backend — Node/Express на TypeScript с Prisma + PostgreSQL; frontend — React (JavaScript) + Vite + Axios. README ориентирован на HR и техлида: как запустить, что показать на интервью и какие вопросы ожидать.

**Ссылки**
- Репозиторий: https://github.com/YaroslavBoliachevets/posts-fullstack
- Демо (frontend): https://posts-fullstack-c9b7.onrender.com (бек на рендере дают на 30 дней, может не работать, дальше инструкция как запустить локально)

**Стек технологий**
- Frontend: React, JavaScript, Vite, Axios, MobX
- Backend: Node.js, Express, TypeScript
- База данных: PostgreSQL
- ORM: Prisma
- Email: nodemailer
- Dev: ts-node-dev, prisma, eslint

**Ключевые возможности**
- Регистрация + подтверждение по email (activation link).
- JWT‑аутентификация: короткоживущий accessToken и refreshToken.
- Refresh token хранится в HttpOnly cookie и сохраняется в БД (модель Token), при refresh старый refresh заменяется новым (ротация).
- Logout удаляет refresh из БД и очищает cookie.
- CRUD для постов и комментариев (модели Posts, Comment).
- Валидация входных данных через express-validator.
- Простая обработка ошибок через ApiError (централизованная обработка ошибок).

**Быстрый старт (локально)**
Клонировать
git clone https://github.com/YaroslavBoliachevets/posts-fullstack.git
cd posts-fullstack


Установить зависимости и запустить (в корне запускается фронт + бэк параллельно)
npm install
npm run dev


Запуск backend отдельно
cd posts-backend
npm install
cp .env.example .env   # или создай .env по примеру
npm run dev


Запуск frontend отдельно
cd posts-frontend
npm install
npm run dev


Важно: backend использует TypeScript и запускается через ts-node-dev в режиме разработки. Для production предусмотрен npm run build (генерация Prisma + миграции + tsc) и npm start.

Важные npm‑скрипты
В корне
"dev": "npm-run-all --parallel dev:frontend dev:backend"


Frontend (posts-frontend/package.json)
"dev": "vite",
"build": "vite build",
"lint": "eslint .",
"preview": "vite preview"


Backend (posts-backend/package.json)
"dev": "ts-node-dev --respawn --transpile-only src/app.ts",
"build": "prisma generate && prisma migrate deploy && tsc",
"start": "node dist/app.js",
"prisma:generate": "prisma generate",
"prisma:migrate": "prisma migrate deploy"



**Переменные окружения (минимум для работы)**
Добавь .env.example в репо с этими переменными:
DATABASE_URL="postgresql://<user>:<pass>@<host>:<port>/<db>?schema=public"
PORT=7000
JWT_ACCESS_SECRET=<access-secret>
JWT_REFRESH_SECRET=<refresh-secret>
SMTP_HOST=<smtp-host>
SMTP_PORT=<smtp-port>
SMTP_USER=<smtp-user>
SMTP_PASSWORD=<smtp-password>
API_URL=http://localhost:7000
CLIENT_URL=http://localhost:5173   # или URL деплоя фронта



**Структура и ключевые файлы **
Frontend
- posts-frontend/src/services/$api (axios instance) — withCredentials: true и установка Authorization header.
- posts-frontend/src/hooks/useFetching.js — загрузка данных.
- posts-frontend/src/hooks/useObserver.js — логика infinite scroll / наблюдения.
- posts-frontend/src/pages/Login.jsx — логин/регистрация UI.
Backend
- posts-backend/src/controllers/userController.ts — endpoints: registration, login, logout, refresh, activate.
- posts-backend/src/services/userService.ts — регистрация, login, refresh, logout; отправка писем; сохранение refresh в БД.
- posts-backend/src/services/tokenService.ts — generateTokens, validateAccessToken, validateRefreshToken, saveToken, removeToken, findToken.
- prisma/schema.prisma — модели User, Posts, Comment, Token.


**Auth flow **
- Регистрация POST /api/user/registration
- Создаётся пользователь, генерируется activationLink, отправляется email.
- Генерируются accessToken (TTL 30m) и refreshToken (TTL 30d).
- refreshToken сохраняется в таблице Token и устанавливается в cookie:
res.cookie("refreshToken", userData.refreshToken, {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
- Логин POST /api/user/login — аналогично: возвращает токены и устанавливает cookie.
- Клиент: axios instance ($api) настроен withCredentials: true и добавляет Authorization: Bearer <token> из localStorage.getItem("token").
- Refresh GET /api/user/refresh — сервер валидирует refresh через tokenService.validateRefreshToken, проверяет наличие в БД (findToken), генерирует новые токены, сохраняет новый refresh (замена старого) и устанавливает новую cookie.
- Logout POST /api/user/logout — tokenService.removeToken(refreshToken) и res.clearCookie("refreshToken").

Security notes (есть пробелы)
- Плюсы
- Refresh в HttpOnly cookie — защищён от чтения JS (XSS).
- Refresh хранится в БД — можно отзывать сессии и реализовать ротацию.
- Ограничения / trade‑offs
- Access хранится в localStorage (axios читает localStorage.getItem("token")) — удобно, но уязвимо к XSS. На интервью будь готов объяснить компромиссы и варианты (хранение в памяти, secure cookie, short TTL + silent refresh).
- Настройки cookie (secure: true, sameSite: "none") удобны для продакшена с HTTPS, но усложняют локальную разработку (в локальном режиме может потребоваться secure: false, sameSite: "lax").
- Возможна race condition при параллельных refresh запросах — в roadmap есть пункт по защите от этого.

**Tests и CI**


**Known issues и roadmap**
Known issues
- Access хранится в localStorage — XSS‑риск.
- Нет интеграционных тестов и CI.
- Нет seed‑скрипта для быстрого наполнения БД.
- Cookie secure/sameSite настройки требуют внимания при локальной разработке.
Roadmap (приоритеты)
- Перенести access в память или реализовать безопасный flow без localStorage.
- Добавить интеграционные тесты для auth flow и CRUD.
- Добавить GitHub Actions для линта и тестов.
- Добавить prisma/seed для быстрого демо.
- Обработать race condition при параллельных refresh запросах (client‑side блокировка или server‑side подход).
