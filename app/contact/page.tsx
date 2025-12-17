import { getCurrentUser, isUserAdmin } from '@/lib/auth';
import { getMessages } from './actions';
import ContactClient from './ContactClient';

export default async function ContactPage() {
  const user = await getCurrentUser();
  const isAdmin = user ? await isUserAdmin() : false;
  const messages = await getMessages();

  return <ContactClient user={user} isAdmin={isAdmin} messages={messages} />;
}
