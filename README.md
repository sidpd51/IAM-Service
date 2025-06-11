# IAMService 🏨

---

## 🚀 Features

-   Express REST API
-   Prisma ORM with MySQL
-   TypeScript support
-   Centralized error handling
-   Request tracing via Correlation IDs
-   Winston-based logging
-   User authentication and authorization
-   Role-based access control (RBAC)
-   Environment-based configuration

---

## 🛠️ Prerequisites

Make sure you have the following installed:

-   [Node.js](https://nodejs.org/)
-   [Git](https://git-scm.com/)
-   [MySQL](https://www.mysql.com/) (for local development)

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/sidpd51/IAMService.git
cd IAMService

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your database and app configuration
```

---

## 🗄️ Database Setup

1. Create a MySQL database for the project.
2. Update your `.env` file with the correct database credentials.
3. Deploy migrations to your database:

```bash
npm run migrate
```
---

## 🚦 Running the Application

```bash
npm run dev
```

The server will start on the port specified in your `.env` file.

For production, use:

```bash
npm run build
npm start
```

---

## 🧪 Running Tests

```bash
npm test
```

---

## 📁 Project Structure

```
IAMService/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── src/prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── README.md
├── package.json
└── tsconfig.json
```

---

## 📝 Notes

- For production, ensure you set secure environment variables and use a robust database.
- Logging and error handling are centralized for easier debugging and monitoring.
- For more details, see inline comments in the codebase.
