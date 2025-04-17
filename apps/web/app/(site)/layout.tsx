import { manrope, unbounded } from '@/styles/fonts';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import Script from 'next/script';

import '@shared/ui/styles/global.css';

import { getFooter } from '@/sanity/queries/footer';
import { getNavigation } from '@/sanity/queries/navigation';
import { cn } from '@shared/ui/lib/utils';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { env } from '@/env.mjs';
import { BannerWrapper } from '@/features/banner/banner-wrapper';
import FooterLayout from '@/features/footer/layout';
import NavigationLayout from '@/features/navigation/layout';

export const metadata: Metadata = {
  title: 'Polkadot: Web3 Interoperability | Decentralized Blockchain',
  description:
    'Polkadot empowers blockchain networks to work together under the protection of shared security.',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footer = await getFooter();
  const navigation = await getNavigation();
  const isProduction = env.NODE_ENV === 'production';
  const isProductionDeployment = env.NEXT_PUBLIC_DEPLOYMENT === 'production';
  let VisualEditingComponent = null;
  let isDraftModeEnabled = false;

  if (process.env.NEXT_PUBLIC_BUILD_TYPE === 'dynamic') {
    const { VisualEditing } = await import('next-sanity');
    const { draftMode } = await import('next/headers');
    VisualEditingComponent = VisualEditing;
    isDraftModeEnabled = await draftMode().isEnabled;
  }

  return (
    <html lang="en">
      <head>
        {isProduction && isProductionDeployment && (
          // biome-ignore lint/style/useSelfClosingElements: <Allowed>
          <script src="https://cmp.osano.com/169unzUF2IaM42S5j/0f63db37-496b-4a14-a233-82bbdf3a4afd/osano.js"></script>
        )}

        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://ekndrsoc.ust.stape.io/4ekndrsoc.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','1l=aWQ9R1RNLU1HOUhRNlBN&sort=desc');
          `}
        </Script>

        <Script src="https://js.hsforms.net/forms/embed/v2.js" />
        <Script
          id="plausible"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
          data-domain="polkadot.com"
          defer
        />

        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:5063108,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `}
        </Script>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="70x70"
          href="/favicon/mstile-70x70.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/mstile-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="150x150"
          href="/favicon/mstile-150x150.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="310x150"
          href="/favicon/mstile-310x150.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="310x310"
          href="/favicon/mstile-310x310.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon/android-chrome-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#E6007A" />

        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="theme-color" content="#fff" />
      </head>
      <body
        className={cn(
          unbounded.variable,
          manrope.variable,
          'flex min-h-screen flex-col bg-white font-default antialiased',
        )}
      >
        <noscript>


          <iframe
            title="GTM-MG9HQ6PM"
            src="https://ekndrsoc.ust.stape.io/ns.html?id=GTM-MG9HQ6PM"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <a
          href="#main-content"
          className={cn(
            'group absolute -left-[9999px] -top-[9999px] z-[999] w-screen border-b border-b-grey-400 bg-grey-100 p-4 opacity-100 outline-none',
            'focus:left-0 focus:top-0 focus:opacity-100',
          )}
        >
          <span className="bg-blue inline-block rounded-lg px-10 py-4 font-display text-xs uppercase tracking-wide text-white group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-[#1351d8]">
            Skip to main content
          </span>
        </a>

        <BannerWrapper type="desktop" />
        <div className="relative">
          {navigation && <NavigationLayout navigation={navigation} />}

          <main className="flex-grow ">{children}</main>
        </div>
        {footer && <FooterLayout footer={footer} />}

        {env.VERCEL_ENV === 'development' && <TailwindIndicator />}
        {isDraftModeEnabled && VisualEditingComponent && (
          <VisualEditingComponent />
        )}
        {env.VERCEL_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
