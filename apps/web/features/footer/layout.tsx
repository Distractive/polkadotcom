import type { footerSelection } from "@/sanity/selections/footer/footer"
import type { TypeFromSelection } from "groqd"

import { Logo } from "../../components/logo"
import Menu from "./menu"
import SocialLinks from "./social-links"

interface Props {
  footer: TypeFromSelection<typeof footerSelection>
}

export default function FooterLayout({ footer }: Props) {
  return (
    <footer className="rounded-t-2xl bg-purple-500">
      <div className="mx-auto w-full">
        <Menu menu={footer.menu} />
      </div>
      <hr className="border-purple-400 sm:mx-auto" />
      <div className="flex flex-col items-start gap-4 px-gutter py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center gap-8">
          <a href="/" className="group">
            <Logo
              className="w-32 hover:fill-pink md:w-48"
              dotsClassName="transition duration-500 ease-out group-hover:fill-pink"
            />
          </a>
          <p className="text-sm text-white">© {new Date().getFullYear()}</p>
        </div>
        <SocialLinks items={footer.socialLinks} />
      </div>
    </footer>
  )
}
