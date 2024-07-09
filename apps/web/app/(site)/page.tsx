import { getHome } from "@/sanity/queries/home"

import { Root } from "@/features/home/root"

export const dynamic = "force-static"

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
