// app/api/chat/route.ts
import { POST as tutorPOST } from '../tutor/route';

export async function POST(req: Request) {
  return tutorPOST(req);
}