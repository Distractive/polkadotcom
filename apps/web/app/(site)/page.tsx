import { Heading } from "@shared/ui"

export default function Home() {
  return (
    <main className="grid-system gap-page py-page">
      <Heading variant="h1" className="col-span-full ">
        Polkadot
      </Heading>
      <section className="col-span-6 grid gap-section">
        <article className="grid gap-card">
          <div className="grid gap-copy">
            <Heading variant="h3">This is a heading</Heading>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In alias,
              repellendus nam facere, harum at adipisci soluta hic qui quasi
              fugit dicta nihil cupiditate! Quia, beatae officiis. Perspiciatis,
              voluptatem laboriosam!
            </p>
          </div>
          <div className="h-40 bg-grey-light lg:h-60"></div>
        </article>
      </section>
      <section className="col-span-6 grid gap-section">
        <article className="grid gap-card">
          <div className="grid gap-copy">
            <Heading variant="h3">This is a heading</Heading>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In alias,
              repellendus nam facere, harum at adipisci soluta hic qui quasi
              fugit dicta nihil cupiditate! Quia, beatae officiis. Perspiciatis,
              voluptatem laboriosam!
            </p>
          </div>
          <div className="h-40 bg-grey-light lg:h-60"></div>
        </article>
      </section>
    </main>
  )
}
