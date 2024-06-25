import type { footerSelection } from "@/sanity/selections/footer/footer"
import type { TypeFromSelection } from "groqd"

import { cn } from "@shared/ui"

import { Logo } from "../../components/logo"
import Menu from "./menu"
import SocialLinks from "./social-links"

interface Props {
  footer: TypeFromSelection<typeof footerSelection>
}

export default function FooterLayout({ footer }: Props) {
  return (
    <div
      className={cn(
        "relative mt-page flex flex-col pt-page md:h-[70rem] md:min-h-[52rem] md:justify-end md:overflow-y-hidden lg:h-full"
      )}
    >
      <img
        src="/footer/desk-footer-asset-left.webp"
        alt=""
        className="lg:height-[44rem] hidden md:absolute  md:left-0 md:top-0 md:block md:h-full md:max-w-[45rem] md:object-cover"
      />
      <img
        src="/footer/desk-footer-asset-right.webp"
        alt=""
        className="lg:height-[44rem] hidden md:absolute md:bottom-0 md:right-0 md:block md:h-full md:w-full md:max-w-[46rem] md:object-cover lg:-bottom-[1rem]"
      />
      <div className="flex md:hidden">
        <img
          src="/footer/mob-footer-asset-left.webp"
          alt=""
          className="w-1/2"
        />
        <img
          src="/footer/mob-footer-asset-right.webp"
          alt=""
          className="w-1/2"
        />
      </div>
      <footer className="max-width relative">
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
              <p className="text-sm text-black">
                © {new Date().getFullYear()}
              </p>
            </div>
            <SocialLinks items={footer.socialLinks} />
          </div>
        </div>
      </footer>
    </div>
  )
}
