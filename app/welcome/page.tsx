// app/welcome/page.tsx
import { redirect } from 'next/navigation';

export default function WelcomePageRedirect() {
  redirect('/');
}