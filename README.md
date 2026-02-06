## Backend Service with Prisma ORM

This repository contains a Node.js backend service that uses Prisma ORM to manage a PostgreSQL database. It provides a structured data layer with relational models for users, profiles, and posts, and integrates Prisma’s type-safe client into the application’s runtime.

## Tech stack

- **Runtime**: Node.js
- **Language**: JavaScript / TypeScript (via `tsx`)
- **Framework**: Express
- **ORM**: Prisma (`@prisma/client`, `prisma`)
- **Database**: PostgreSQL
- **Config & tooling**: `dotenv`, `nodemon`, `tsx`

## Key features

- **Prisma-powered data layer**:  
  - Centralized schema definition in `prisma/schema.prisma`.
  - PostgreSQL datasource and Prisma Client generator configured for the project.
  - Generated, type-safe Prisma client emitted to `src/generated/prisma`.

- **Relational data model**:  
  - `User`, `Profile`, and `Post` models with clear relations:
    - One-to-many: `User` → `Post`.
    - One-to-one: `User` ↔ `Profile`.
  - Constraints and indexes (e.g. unique email, unique profile per user) enforced at the database level.

- **Migrations and schema evolution**:  
  - Prisma migrations stored under `prisma/migrations/` (e.g. `20260121205148_init`).
  - SQL migration files define table creation, indexes, and foreign keys to keep the database schema in sync with `schema.prisma`.

- **Database integration**:  
  - PostgreSQL connection configured through `DATABASE_URL`.
  - `PrismaClient` wired up with `@prisma/adapter-pg` in `src/config/db.js` for a clean, reusable database entry point.

- **Developer tooling**:  
  - NPM scripts for development, migration, client generation, and Prisma Studio.
  - Watch-based development workflow via `tsx` for a smoother DX.

## Setup

### Prerequisites

- **Node.js** and **npm** installed.
- **PostgreSQL** instance available (local or remote).
- A valid **database connection string**.

### Installation

1. **Clone the repository** and move into the project directory:

   ```bash
   git clone <repo-url>
   cd Prisma
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Create a `.env` file in the project root and set your PostgreSQL connection string:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"
   ```

### Database and Prisma

1. **Run migrations** to create/update the database schema:

   ```bash
   npm run prisma:migrate
   ```

   This applies the migrations under `prisma/migrations/` and keeps the database aligned with `prisma/schema.prisma`.

2. **Generate the Prisma client** (if needed):

   ```bash
   npm run prisma:generate
   ```

   This regenerates the Prisma client in `src/generated/prisma`, which is then consumed by the application via `PrismaClient` in `src/config/db.js`.

3. **(Optional) Open Prisma Studio** for inspecting and editing data:

   ```bash
   npm run prisma:studio
   ```

### Running the application

Start the development server:

```bash
npm run dev
```

The app uses `tsx` in watch mode (see the `dev` script in `package.json`) to enable a quick feedback loop during development.

## Author

- **Author**: <Your Name>

