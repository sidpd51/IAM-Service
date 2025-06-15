# IAM-Service

A robust Identity and Access Management (IAM) REST API built with **Express**, **TypeScript**, **Prisma ORM**, and **MySQL**. This service provides secure user authentication, role-based access control (RBAC), centralized error handling, request tracing, and structured logging.

---

## 🚀 Features

-   **Express REST API** for user and role management
-   **Prisma ORM** with MySQL for database access
-   **TypeScript** for type safety and maintainability
-   **Centralized error handling** with custom error classes
-   **Request tracing** using Correlation IDs (AsyncLocalStorage)
-   **Winston-based logging** with correlation context
-   **User authentication** (JWT-based)
-   **Role-based access control (RBAC)**
-   **Environment-based configuration** via `.env`
-   **Input validation** using Zod schemas

---

## 🛠️ Prerequisites

-   [Node.js](https://nodejs.org/)
-   [MySQL](https://www.mysql.com/)
-   [Git](https://git-scm.com/)

---

## 📦 Installation

```sh
git clone https://github.com/your-org/IAM-Service.git
cd IAM-Service

npm install

cp .env.example .env
# Edit .env with your database credentials and secrets
```

---

## 🗄️ Database Setup

1. Create a MySQL database (e.g., `iam_service`).
2. Update your `.env` with the correct `DATABASE_URL`.
3. Run migrations and generate the Prisma client:

```sh
npm run build
npm run prisma-migrate
npm run prisma-generate
```

4. (Optional) Seed the database:

```sh
npm run prisma-seed
```

---

## 🚦 Running the Application

**Development:**

```sh
npm run dev
```

**Production:**

```sh
npm run build
npm start
```

---

## 🧪 Testing

> _No test scripts are defined yet. Add your tests in the `tests/` directory and configure npm scripts as needed._

---

## 📁 Project Structure

```
IAM-Service/
├── src/
│   ├── config/           # App and logger configuration
│   ├── controllers/      # Express route handlers
│   ├── dto/              # Data transfer objects and enums
│   ├── middlewares/      # Express middlewares (error, correlation)
│   ├── prisma/           # Prisma schema, migrations, seed, and samples
│   ├── repositories/     # Data access logic
│   ├── routers/          # Express routers (v1)
│   ├── services/         # Business logic
│   ├── utils/            # Helpers and error classes
│   └── validators/       # Zod schemas and validation middleware
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📝 Notes

-   **Environment variables**: All sensitive config is managed via `.env`.
-   **Logging**: All logs include a correlation ID for traceability.
-   **Error handling**: Centralized and consistent error responses.
-   **RBAC**: Easily extendable for more roles and permissions.
-   **Prisma**: All database models and migrations are managed in `src/prisma/`.

---

## 📚 API Endpoints

> See `src/routers/v1/user.router.ts` for details.

-   `GET /api/v1/users/` — List all users
-   `POST /api/v1/users/signup` — Register a new user
-   `POST /api/v1/users/signin` — Authenticate and receive JWT
-   `POST /api/v1/users/hasrole` — Check if user has a specific role
-   `POST /api/v1/users/addrole` — Assign a role to a user

---

## 🛡️ Security

-   Passwords are hashed with bcrypt.
-   JWT is used for authentication.
-   Input validation is enforced with Zod.

---

## 👥 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT

---

## 📞 Contact

For questions, open an issue or contact the maintainer.
