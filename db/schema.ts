import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  login: text("login").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const messagesTable = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  author: text("author").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});