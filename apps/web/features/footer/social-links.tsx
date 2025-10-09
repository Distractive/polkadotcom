import { urlForImage } from '@/sanity/lib/image';
import type { socialLinkSelection } from '@/sanity/selections/footer/social-links';
import type { TypeFromSelection } from 'groqd';

interface Props {
  items: Array<TypeFromSelection<typeof socialLinkSelection>>;
}
export default function SocialLinks({ items }: Props) {
  return (
    <div
      className="flex w-full flex-row flex-wrap items-center md:justify-end"
      data-testid="social-links"
    >
      <div className="flex w-full flex-row flex-wrap items-center gap-7 md:justify-end">
        {items?.map((item) => {
          const src = urlForImage(item.image.asset);
          return (
            <a
              href={item.url}
              target="_blank"
              key={item.title}
              className="group flex size-8 items-center justify-center rounded-full transition duration-200 ease-out text-black dark:text-white hover:text-pink focus:text-pink"
              rel="noreferrer"
            >
              <span
                aria-hidden="true"
                className="inline-block h-8 w-8 bg-current"
                style={{
                  WebkitMaskImage: `url(${src})`,
                  maskImage: `url(${src})`,
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              />
              <span className="sr-only">{item.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
