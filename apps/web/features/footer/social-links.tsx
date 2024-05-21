import type { socialLinkSelection } from "@/sanity/selections/social-links"
import type { TypeFromSelection } from "groqd"

interface Props {
  items: Array<TypeFromSelection<typeof socialLinkSelection>>
}
export default function SocialLinks({ items }: Props) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <span>{item.url}</span>
          <img src={item.image.asset.url} />
        </div>
      ))}
    </div>
  )
}
