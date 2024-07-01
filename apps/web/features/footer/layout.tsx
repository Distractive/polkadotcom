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
        "relative mt-page flex flex-col md:h-[70rem] md:justify-end md:overflow-y-hidden lg:h-full lg:min-h-[55rem]"
      )}
    >
      <picture>
        <source
          media="(min-width: 22.5rem)"
          srcSet="/footer/desk-footer-asset-left.jpg"
          className="lg:height-[44rem] hidden w-1/2 md:absolute md:left-0 md:top-[2rem] md:block md:h-full md:max-w-[42rem] md:object-cover md:object-[-20rem]"
        />
        <img
          src="/footer/desk-footer-asset-left.jpg"
          alt=""
          loading="lazy"
          className="lg:height-[44rem] hidden w-1/2 md:absolute md:left-0 md:top-[2rem] md:block md:h-full md:max-w-[42rem] md:object-cover md:object-[-20rem] lg:object-center"
        />
      </picture>

      <picture>
        <source
          media="(min-width: 22.5rem)"
          srcSet="/footer/desk-footer-asset-right.jpg"
          className="lg:height-[44rem] hidden w-1/2 md:absolute md:-bottom-[2rem] md:right-0 md:block md:h-full md:max-w-[42rem] md:object-cover lg:-bottom-[2rem]"
        />
        <img
          src="/footer/desk-footer-asset-right.jpg"
          alt=""
          loading="lazy"
          className="lg:height-[44rem] hidden w-1/2 md:absolute md:-bottom-[2rem] md:right-0 md:block md:h-full md:max-w-[42rem] md:object-cover lg:-bottom-[2rem]"
        />
      </picture>

      <div className="flex md:hidden">
        <picture>
          <source
            media="(max-width: 22.5rem)"
            srcSet="/footer/mob-footer-asset-left.jpg"
          />
          <img src="/footer/mob-footer-asset-left.jpg" alt="" loading="lazy" />
        </picture>
        <picture>
          <source
            media="(max-width: 22.5rem)"
            srcSet="/footer/mob-footer-asset-right.jpg"
          />
          <img src="/footer/mob-footer-asset-right.jpg" alt="" loading="lazy" />
        </picture>
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
                <Logo
                  ariaLabel="Polkadot homepage"
                  className="h-auto w-32 md:w-48 md:hover:text-pink"
                />
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
