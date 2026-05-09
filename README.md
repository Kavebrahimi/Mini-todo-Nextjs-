# Mini Todo List

Mini Todo List is a simple full-stack todo application built with Next.js.  
The goal of this project is to practice modern web development concepts such as authentication, protected routes, API routes, database operations, and client-side data management.

## Features

- User authentication
- Signup and login
- Protected home page
- Create todo items
- Update todo completion status
- Delete todo items
- Server-side API routes
- Cookie-based authentication

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod

### Backend

- Next.js API Routes
- Drizzle ORM
- PostgreSQL
- JWT authentication
- bcrypt for password hashing

## Project Structure

```txt
app/
├── api/
│   ├── auth/
│   │   ├── login/
│   │   ├── signup/
│   │   └── me/
│   └── todos/
├── login/
├── signup/
└── page.tsx

components/
├── ui/
└── shared components

features/
├── auth/
└── todos/

services/
├── auth/
└── todos/

db/
├── schema.ts
└── index.ts
