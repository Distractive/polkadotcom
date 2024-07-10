import type { footerSelection } from "@/sanity/selections/footer/footer"
import type { TypeFromSelection } from "groqd"

import { cn } from "@shared/ui"

import { Logo } from "../../components/logo"
import { Background } from "./background"
import Menu from "./menu"
import SocialLinks from "./social-links"

interface Props {
  footer: TypeFromSelection<typeof footerSelection>
}

export default function FooterLayout({ footer }: Props) {
  return (
    <div
      className={cn(
        "relative mt-page flex flex-col font-bold md:h-[70rem] md:justify-end md:overflow-y-hidden lg:mt-0 lg:h-full lg:min-h-[55rem]"
      )}
    >
      <Background />
      <footer className="max-width relative">
        <div className="bg-grey-200 md:mx-gutter md:mb-gutter md:rounded-2xl md:border md:border-grey-300">
          <div className="mx-auto w-full">
            <Menu menu={footer.menu} />
          </div>
          <hr className="border-grey-300 sm:mx-auto" />
          <div className="flex flex-col items-start gap-4 px-gutter py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-row items-center gap-8">
              <a href="/" className="group">
                <Logo
                  ariaLabel="Polkadot homepage"
                  className="h-auto w-32 md:w-48"
                />
              </a>
              <p className="flex gap-copy text-sm text-black">
                <span>©</span> {new Date().getFullYear()}
              </p>
            </div>
            <SocialLinks items={footer.socialLinks} />
          </div>
        </div>
      </footer>
    </div>
  )
}
