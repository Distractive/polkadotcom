import { client } from '@/sanity/lib/client';
import { token } from '@/sanity/lib/token';

const clientWithToken = client.withConfig({ token });

export async function GET(request: Request) {
  if (process.env.NEXT_PUBLIC_BUILD_TYPE === 'static') {
    return new Response('Static export mode', { status: 200 });
  }

  const { draftMode } = await import('next/headers');
  const { validatePreviewUrl } = await import('@sanity/preview-url-secret');
  const { redirect } = await import('next/navigation');

  const url = new URL(request.url);
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    url.toString(),
  );

  // if (!isValid) {
  //   return new Response('Invalid secret', { status: 401 });
  // }

  draftMode().enable();
  redirect(redirectTo);
}
