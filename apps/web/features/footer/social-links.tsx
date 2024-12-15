import type { socialLinkSelection } from "@/sanity/selections/footer/social-links"
import type { TypeFromSelection } from "groqd"

interface Props {
  items: Array<TypeFromSelection<typeof socialLinkSelection>>
}
export default function SocialLinks({ items }: Props) {
  return (
    <div className="flex w-full flex-row flex-wrap items-center gap-3 md:justify-end">
      {items &&
        items.map((item, index) => (
          <a
            href={item.url}
            target="_blank"
            key={index}
            className="flex size-12 items-center justify-center rounded-full transition duration-500 ease-out hover:bg-grey-400"
          >
            <img
              src={item.image.asset.url}
              alt=""
              aria-hidden="true"
              className="fill-black"
              width={32}
              height={32}
            />
            <span className="sr-only">{item.title}</span>
          </a>
        ))}
    </div>
  )
}
