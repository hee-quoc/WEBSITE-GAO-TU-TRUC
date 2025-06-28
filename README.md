Of course. Here is a concise and clear `README.md` file tailored specifically for your Next.js/tRPC/Prisma project. It's designed to get a new teammate up and running as quickly as possible.

Just copy and paste the entire content below into a new file named `README.md` in the root of your project.

---

# TT-Rice Project

This is the official repository for the TT-Rice admin dashboard and website. This project is built with the T3 Stack (Next.js, tRPC, Prisma, Tailwind CSS).

## 🚀 Getting Started

Follow these steps to set up your local development environment.

### 1. Prerequisites

*   [Node.js](https://nodejs.org/en/) (v18 or later)
*   [Docker](https://www.docker.com/products/docker-desktop/) (for running the PostgreSQL database)

### 2. Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd tt-rice-app
    ```

2.  **Install project dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a local environment file by copying the example.
    ```bash
    cp .env.example .env
    ```
    The default `DATABASE_URL` in this file is already configured for the Docker setup below. No changes are needed.

4.  **Start the database:**
    This command will start a PostgreSQL database in a Docker container.
    ```bash
    docker-compose up -d
    ```

5.  **Sync the database schema:**
    This command reads the `prisma/schema.prisma` file and creates the necessary tables in your database. It also creates the default admin user.
    ```bash
    npx prisma db push
    npx prisma db seed
    ```

6.  **Run the development server:**
    ```bash
    npm run dev
    ```

Your application is now running at `http://localhost:3000`.

## 🧑‍💻 Development Guide

### How Authentication Works

This project uses a simple email/password authentication system managed by NextAuth.js.

*   **There is no public registration page.**
*   A default administrator account is created when you run the `db seed` command.
*   **Default Credentials:**
    *   **Email:** `admin@example.com`
    *   **Password:** `password123`

Log in with these credentials to access protected routes and manage products.

### How to Add a New Page (Client-Side)

This project uses the **Next.js App Router**. Routing is based on the folder structure inside `src/app/`.

1.  **Create a new folder** inside `src/app/`. The folder name will be the URL path (e.g., `src/app/dashboard/` creates the `/dashboard` route).
2.  **Inside that folder, create a file named `page.tsx`**. This file is the UI for your new page.

**Example: Adding an "About Us" page at `/about`**

1.  Create a new folder: `src/app/about/`
2.  Create the page file: `src/app/about/page.tsx`
3.  Add your React component code to `page.tsx`:
    ```tsx
    // src/app/about/page.tsx
    export default function AboutPage() {
      return (
        <main>
          <h1>About Us</h1>
          <p>We sell the best rice!</p>
        </main>
      );
    }
    ```
4.  That's it! You can now navigate to `http://localhost:3000/about`. No other registration is needed.

### How to Add a New API Endpoint (Server-Side)

API endpoints are managed by **tRPC**. All server-side logic lives in `src/server/api/routers/`.

1.  **Create a new router file** in `src/server/api/routers/` (e.g., `user.ts`).
2.  **Define your procedures** (queries or mutations) inside this new file.
3.  **Mount the new router** in the main `appRouter` located at `src/server/api/root.ts`.

**Example: Adding a new router to get the current user's info**

1.  **Create the file:** `src/server/api/routers/user.ts`
2.  **Add the logic:**
    ```ts
    // src/server/api/routers/user.ts
    import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

    export const userRouter = createTRPCRouter({
      me: protectedProcedure.query(({ ctx }) => {
        // The user object is available on the context for protected procedures
        return ctx.session.user;
      }),
    });
    ```
3.  **Mount it in `root.ts`:**
    ```ts
    // src/server/api/root.ts
    import { productRouter } from "~/server/api/routers/product";
    import { userRouter } from "~/server/api/routers/user"; // <-- 1. Import it
    import { createTRPCRouter } from "~/server/api/trpc";

    export const appRouter = createTRPCRouter({
      product: productRouter,
      user: userRouter, // <-- 2. Add it to the main router
    });

    export type AppRouter = typeof appRouter;
    ```
4.  **Use it on the client:** You can now call this new endpoint from any component using `api.user.me.useQuery()`.

## 🔧 Useful Commands

*   `npm run dev`: Starts the local development server.
*   `docker-compose up -d`: Starts the database container.
*   `docker-compose down`: Stops the database container.
*   `npx prisma studio`: Opens a web UI to view and edit your database.
*   `npx prisma db push`: Pushes schema changes to the database.