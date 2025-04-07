import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

const { GET: draftModeHandler } = defineEnableDraftMode({
  client: client.withConfig({ token }),
});

export async function GET(request: Request) {
  if (process.env.NEXT_PUBLIC_BUILD_TYPE === 'static') {
    return new Response('Static export mode', { status: 200 });
  }

  return draftModeHandler(request);
}
