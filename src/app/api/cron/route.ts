import { cronCreateOne } from '@/server/quotes/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers?.get('Authorization');

  if (
    process.env.NODE_ENV === 'production' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse('unauthorized', { status: 401 });
  }
  await cronCreateOne();
  return NextResponse.json({ ok: true });
}
