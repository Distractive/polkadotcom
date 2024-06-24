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
    <footer className="max-width mt-page">
      <div className="bg-grey-200 md:mx-gutter md:mb-gutter md:rounded-2xl md:border md:border-grey-300">
        <div className="mx-auto w-full">
          <Menu menu={footer.menu} />
        </div>
        <hr className="border-grey-300 sm:mx-auto" />
        <div className="flex flex-col items-start gap-4 px-gutter py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-row items-center gap-8">
            <a href="/" className="group">
              <Logo className="h-auto w-32 md:w-48 md:hover:text-pink" />
            </a>
            <p className="text-sm text-black">© {new Date().getFullYear()}</p>
          </div>
          <SocialLinks items={footer.socialLinks} />
        </div>
      </div>
    </footer>
  )
}
