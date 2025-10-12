# 📦 Database Setup Guide – PROJECT-BACKEND

This project supports multiple database configurations for flexibility and scalability. The backend is built with NestJS and uses **JWT authentication** for secure access control.

---

## 🔐 Authentication

- All protected routes require a valid JWT token.
- Token is issued upon login and must be included in the `Authorization` header as a Bearer token.
- JWT secret and expiration settings are stored in `.env`.

```env
JWT_SECRET=Sometimes it is the things you dont need to know
JWT_EXPIRES_IN=HR i guess
```
