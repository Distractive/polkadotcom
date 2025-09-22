import logo from '@/public/polkadot-logo.png';
import type { footerSelection } from '@/sanity/selections/footer/footer';
import type { TypeFromSelection } from 'groqd';
import Image from 'next/image';

import FooterGradient from '../gradients/footer-gradient';
import Menu from './menu';
import SocialLinks from './social-links';

interface Props {
  footer: TypeFromSelection<typeof footerSelection>;
}

const modalData = {
  cta: 'Subscribe',
  modalHeading: "Polkadot's latest news, straight from the source.",
  formType: 'a5ecd657-6aae-4da0-bf08-f3b994919f0b',
  _key: '0e433bc64886',
};

export default function FooterLayout({ footer }: Props) {
  return (
    <div className="relative flex flex-col items-center pt-40 font-bold md:pt-36 ">
      <FooterGradient />
      <footer className="relative  max-width px-gutter">
        <div
          className="border border-grey-200  md:mb-gutter md:rounded-2xl relative bg-white"
          data-testid="footer"
        >
          <div className="flex flex-col items-start px-gutter py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex h-full max-w-56 flex-row items-end gap-6 md:max-w-64">
              <a href="/" className="group">
                <Image
                  src={logo}
                  alt="Polkadot logo"
                  width={180}
                  style={{ height: 'auto' }}
                  role="img"
                  priority
                />
              </a>
            </div>
            {/* Desktop Links */}
            <div className="hidden md:block">
              <SocialLinks items={footer.socialLinks} />
            </div>
          </div>
          <hr className="border-grey-200 sm:mx-auto" />
          <div className="mx-auto w-full">
            <Menu menu={footer.menu} modal={modalData} />
          </div>
          <hr className="border-grey-200 sm:mx-auto" />
          <div className="flex flex-col items-center justify-between px-gutter py-4 text-sm font-light text-grey-700 md:flex-row">
            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
              <div>
                <a href="https://web3.foundation/" className="hover:text-black">
                  Web3 Foundation
                </a>
              </div>
              <div>
                <a href="/legal-disclosures/" className="hover:text-black">
                  Legal Disclosures
                </a>
              </div>
              <div>
                <a href="/privacy/" className="hover:text-black">
                  Privacy Policy
                </a>
              </div>
              <div>
                <a href="/cookie-policy/" className="hover:text-black">
                  Cookie Policy
                </a>
              </div>
            </div>
            {/* Mobile Links */}
            <div className="block md:hidden">
              <SocialLinks items={footer.socialLinks} />
            </div>
            <div className="mt-4 md:mt-0">
              <p className="flex translate-y-[-1px] transform flex-row gap-1">
                <span>©</span> {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
