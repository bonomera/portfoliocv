import { compare, hash } from 'bcryptjs'
import { cookies } from 'next/headers'

export async function login(form: FormData) {
  // Same as last time

  // This is new
  if (loggedIn) {
    const secret = process.env.SECRET
    const signature = await hash(secret + login, 10)
    const cookieStore = await cookies()
    cookieStore.set('session', `${login};${signature}`)
  }
  redirect((await headers()).get('referer') ?? '/')