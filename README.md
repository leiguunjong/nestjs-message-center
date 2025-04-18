(中文版本请阅读README.chinese.md)
## Target Audience

- **Frontend Developers**:  
  Want to understand the full workflow behind API requests and grasp core backend concepts to improve collaboration (and healthy debates 😉) with backend teams.

- **NestJS Enthusiasts**:  
  Already familiar with NestJS concepts? This project provides hands-on implementation examples.

- **Full-Stack Developers**:  
  Ready-to-use message center module and RBAC permission system for direct reuse or customization.

---

## Overview

An enterprise-grade NestJS starter project - A complete message center backend system built with **TypeORM + MySQL + JWT + RBAC + Pino + Swagger**. Core features:

- **User Management**  
  Secure user registration/login with JWT authentication

- **RBAC Authorization**  
  Role-Based Access Control with granular permissions

- **Message CRUD**  
  Full message lifecycle management APIs

- **Structured Logging**  
  High-performance Pino logger with context tracking

- **Auto-Generated Docs**  
  Interactive API documentation via Swagger UI

- **Environment Config**  
  Multi-environment support through `.env` files

- **Database Design**  
  MySQL with TypeORM for:  
  - Primary/Foreign Keys  
  - Composite Keys  
  - Joins & Cascading Deletes  
  - Unique Indexes

- **Data Security**  
  Sensitive data desensitization before storage

### Project Structure
```
src/
├── authentication/ # User register & login
├── decorator/ # Custom decorators
├── enum/ # Enum type definitions
├── guards/ # Authorization & Role guards
├── message/ # Message management module
├── users/ # User management module
├── app.module.ts # Main application module
└── main.ts # Application entry point
```
---

## Requirements

- Node.js 20.x+
- [MySQL 8.x+](https://dev.mysql.com/downloads/mysql/)
- [pnpm](https://pnpm.io/)

---

## Quick Start

### 1. Configure Environment Variables
Create `.env` file with your credentials:
```env
DB_USER=your_user
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

### 2. Create Database
```bash
mysql -u root -p
```
```sql
CREATE DATABASE message_center;
-- Tables will be auto-generated by TypeORM in dev mode
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4.Run Application
```bash
# Development
pnpm run start:dev

# Production
pnpm run start:prod
```

## API Access
Visit Swagger docs after starting the server:  
http://localhost:3000/api

## Contribution
PRs welcome!  
🌟 Star the repo if you find it useful!  
🐛 Found an issue? Open a ticket with reproduction steps.