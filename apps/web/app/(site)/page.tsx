import { type Metadata } from "next"
import { getHome } from "@/sanity/queries/home"
import { getSingletonMeta } from "@/sanity/queries/page"

import { Root } from "@/features/home/root"

export const dynamic = "force-static"

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getSingletonMeta("_type == 'home'")
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
  const home = await getHome()

  return (
    <>
      <section className="col-span-12">
        <Root home={home.home} />
      </section>
    </>
  )
}
