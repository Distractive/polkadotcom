import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_BUILD_TYPE === 'static') {
    return new Response('Static export mode', { status: 200 });
  }

  const { draftMode } = await import('next/headers');
  const { NextResponse } = await import('next/server');

  draftMode().disable();
  const url = new URL(request.url);
  return NextResponse.redirect(new URL('/', url.origin));
}
