import type { footerSelection } from "@/sanity/selections/footer/footer"
import type { TypeFromSelection } from "groqd"

import { Logo } from "../../components/logo"
import { FooterGradientPink } from "../gradients/footer-pink"
import { FooterGradientYellow } from "../gradients/footer-yellow"
import { Background } from "./background"
import Menu from "./menu"
import SocialLinks from "./social-links"

interface Props {
  footer: TypeFromSelection<typeof footerSelection>
}

export default function FooterLayout({ footer }: Props) {
  return (
    <div className="relative flex  flex-col font-bold md:mt-page md:pt-page">
      {/* <Background /> */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 transform 2xl:translate-x-[-5%]">
          <FooterGradientYellow />
        </div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-[60%] transform 2xl:translate-x-[10%]">
          <FooterGradientPink />
        </div>
      </div>

      <footer className="max-width relative">
        <div className="bg-blur-sm bg-grey-200/60 md:mx-gutter md:mb-gutter md:rounded-2xl md:border md:border-grey-300">
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

{
  /* <div id="" className="max-width absolute inset-0 -z-50">
         <div className="absolute bottom-0 left-0 translate-x-[-40%] translate-y-[10%]  transform lg:translate-y-[10%]">
            <FooterGradientYellow />
          </div>
         <div className="absolute bottom-0 right-0  translate-x-[50%]  translate-y-[5%] transform">
            <FooterGradientPink />
          </div>
        </div> */
}
