import { type Metadata } from "next"
import { draftMode } from "next/headers"
import { getHome } from "@/sanity/queries/home"
import { getSingletonMeta } from "@/sanity/queries/page"

import { Root } from "@/features/home/root"

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getSingletonMeta("home")
  if (!meta)
    return {
      title: "Polkadot 404",
      description: "Page not found",
    }

  return {
    title: meta.meta?.meta_title || "Polkadot",
    description:
      meta.meta?.meta_description ||
      "Polkadot empowers blockchain networks to work together under the protection of shared security.",
    openGraph: {
      images: [meta.meta?.meta_image?.asset.url || ""],
    },
  }
}

export default async function Home() {
  const isDraftMode = draftMode().isEnabled
  const home = await getHome(isDraftMode)

  return (
    <>
      <section className="col-span-full overflow-hidden">
        <Root home={home.home} />
      </section>
    </>
  )
}
