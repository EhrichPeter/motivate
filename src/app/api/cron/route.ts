import { cronCreateOne } from '@/server/quotes/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers?.get('Authorization') !==
      `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse('unauthorized', { status: 401 });
  }
  await cronCreateOne();
  return NextResponse.json({ ok: true });
}
