'use server';

import { compare, hash } from "bcryptjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

const SECRET = process.env.SECRET || "fallback-secret-change-this";

export async function register(form: FormData) {
  const login = String(form.get('login') || '').trim();
  const password = String(form.get('password') || '').trim();

  if (!login || !password) {
    throw new Error('Login et mot de passe requis');
  }

  await db.insert(usersTable).values({
    login,
    password: await hash(password, 10),
  });

  redirect('/contact');
}

export async function login(form: FormData) {
  const login = String(form.get('login') || '').trim();
  const password = String(form.get('password') || '').trim();

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.login, login));

  const loggedIn =
    users.length > 0
      ? await compare(password, users[0].password)
      : false;

  if (loggedIn) {
    const signature = await hash(SECRET + login, 10);
    const cookieStore = await cookies();
    cookieStore.set('session', `${login};${signature}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    redirect('/contact');
  } else {
    throw new Error('Identifiants incorrects');
  }
}

export async function getCurrentUser(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  if (!session) return null;

  const [login, signature] = session.value.split(';');

  try {
    const correct = await compare(SECRET + login, signature);
    return correct ? login : null;
  } catch {
    return null;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/contact');
}

export async function isUserAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.login, user));

  return users.length > 0 ? users[0].isAdmin : false;
}