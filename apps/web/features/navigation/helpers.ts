import { type navigationMenuSelection } from "@/sanity/selections/navigation/navigation-menu"
import { type TypeFromSelection } from "groqd"

type NavLink = ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>

export const handleActiveLink = (
  link: NavLink[number] | NavLink[number]["items"][number],
  currentPath: string
): boolean => {
  if (!link.link?.internal) return false
  if (link.link.internal.slug === currentPath) {
    return true
  } else {
    return false
  }
}
