'use server';

import { db } from "@/db";
import { messagesTable, usersTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function postMessage(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non authentifié");

  const content = String(formData.get("content") || "").trim();
  if (!content) throw new Error("Message vide");

  await db.insert(messagesTable).values({
    author: user,
    content,
  });

  revalidatePath("/contact");
}

export async function getMessages() {
  return db
    .select()
    .from(messagesTable)
    .orderBy(desc(messagesTable.createdAt));
}

export async function deleteMessage(messageId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non authentifié");

  const messages = await db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.id, messageId));

  if (messages.length === 0) throw new Error("Message non trouvé");

  const message = messages[0];

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.login, user));

  const isAdmin = users.length > 0 ? users[0].isAdmin : false;

  if (message.author !== user && !isAdmin) {
    throw new Error("Vous ne pouvez supprimer que vos propres messages");
  }

  await db
    .delete(messagesTable)
    .where(eq(messagesTable.id, messageId));

  revalidatePath("/contact");
}

// Action pour l'admin : récupérer tous les utilisateurs
export async function getAllUsers() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non authentifié");

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.login, user));

  const isAdmin = users.length > 0 ? users[0].isAdmin : false;
  if (!isAdmin) throw new Error("Accès réservé aux administrateurs");

  // Retourner tous les users avec login et password (attention sécurité!)
  return db.select().from(usersTable);
}

// Action admin pour supprimer un utilisateur
export async function deleteUser(userId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non authentifié");

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.login, user));

  const isAdmin = users.length > 0 ? users[0].isAdmin : false;
  if (!isAdmin) throw new Error("Accès réservé aux administrateurs");

  await db.delete(usersTable).where(eq(usersTable.id, userId));

  revalidatePath("/contact");
}
