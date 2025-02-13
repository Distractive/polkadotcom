import Image from "next/image"
import logo from "@/public/polkadot-logo.png"
import type { footerSelection } from "@/sanity/selections/footer/footer"
import type { TypeFromSelection } from "groqd"

import Menu from "./menu"
import SocialLinks from "./social-links"

interface Props {
  footer: TypeFromSelection<typeof footerSelection>
}

const modalData = {
  cta: "Subscribe",
  modalHeading: "Polkadot’s latest news, straight from the source.",
  formType: "a5ecd657-6aae-4da0-bf08-f3b994919f0b",
  _key: "0e433bc64886",
}

export default function FooterLayout({ footer }: Props) {
  return (
    <div
      className="relative flex  flex-col  pt-40 font-bold md:pt-36 "
      data-testid="footer"
    >
      <footer className="max-width relative">
        <div className=" border border-grey-200 md:mx-gutter md:mb-gutter md:rounded-2xl">
          <div className="mx-auto w-full">
            <Menu menu={footer.menu} modal={modalData} />
          </div>
          <hr className="border-grey-300 sm:mx-auto" />
          <div className="flex flex-col items-start  px-gutter py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex h-full max-w-56 flex-row items-end gap-6 md:max-w-64 ">
              <a href="/" className="group">
                <Image
                  src={logo}
                  alt="Polkadot logo"
                  width={360}
                  style={{ height: "auto" }}
                  role="img"
                  priority
                />
              </a>
              <div className="flex h-full flex-col ">
                <p className="flex translate-y-[-1px] transform flex-row gap-1  text-sm text-grey-500">
                  <span>©</span> {new Date().getFullYear()}
                </p>
              </div>
            </div>
            <SocialLinks items={footer.socialLinks} />
          </div>
        </div>
      </footer>
    </div>
  )
}
