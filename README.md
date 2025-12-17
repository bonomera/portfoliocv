# # Portfolio 
Personal portfolio website with a space-themed design. It features blur effects, green glowing halos, and a small message forum.

## ## Tech Stack
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Drizzle ORM
* **Security:** bcryptjs (for password hashing)

## ## Getting Started

1.  **Start the project:**
    `npm run dev`
2.  **Open in browser:**
    [http://localhost:3000](http://localhost:3000)

## ## Database Setup
* **System:** PostgreSQL
* **Tool:** Drizzle ORM
* **Security:** All passwords are **hashed** with bcrypt before being saved.

## ## Contact Forum (User Features)
Normal users can:
* **Create** a new account.
* **Log in** and **Log out**.
* **Write** public messages.
* **Delete** their own messages.

## ## Admin Role
The Admin status is set in the database (column `is_admin` in the `users` table).

An Admin can:
* **View** all users and their hashed passwords.
* **Delete** any message from any user.
* **Delete** any user account.
* **Post** and delete their own messages.