import { getGlossary } from '@/sanity/queries/glossary';
import { getSingletonMeta } from '@/sanity/queries/page';
import {
  cleanTerm,
  groupEntriesByLetter,
} from '@/utils/glossary/glossaryUtils';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { HeaderBlock } from '@/features/page/blocks/header';
import { Body } from '@/features/post/body';
import { SearchBar } from '@/features/posts/search-bar';
import { Heading } from '@shared/ui';

import AlphabetNav from './alphabet-nav';

export const dynamicParams = true;

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getSingletonMeta('glossary');

  if (!meta) {
    return {
      title: 'Glossary Not Found | Polkadot',
      description: "The glossary page you're looking for could not be found.",
    };
  }

  const metaTitle = meta.meta?.meta_title || 'Polkadot Glossary';
  const metaDescription =
    meta.meta?.meta_description ||
    "Explore key terms and concepts in the Polkadot ecosystem. A comprehensive glossary explaining the terminology used in blockchain interoperability, shared security, and Polkadot's innovative technology.";
  const metaImage = meta.meta?.meta_image?.asset?.path || '';

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      images: metaImage ? [metaImage] : [],
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export default async function Page() {
  const data = await getGlossary();
  if (!data) {
    return notFound();
  }

  const entries = data.entries || [];
  const groupedEntries = groupEntriesByLetter(entries);
  const availableLetters = Object.keys(groupedEntries).sort();

  return (
    <div className="max-width grid-system col-span-full">
      {data.header && (
        <HeaderBlock header={data.header} className="!mb-12 !text-grey-900" />
      )}
      <div className="col-span-full px-gutter lg:col-span-8 lg:col-start-3">
        <div className="mb-6 max-w-[24rem]">
          <SearchBar
            searches={entries.map((entry) => ({
              _id: entry._id || '',
              title: cleanTerm(true, entry.term || ''),
              cleanedTerm: cleanTerm(false, entry.term || ''),
              slug: entry.term || '',
            }))}
          />
        </div>

        <AlphabetNav availableLetters={availableLetters} />

        {availableLetters.map((letter) => {
          const letterEntries = groupedEntries[letter] || [];

          return (
            <section
              key={letter}
              id={`section-${letter}`}
              className="mb-16 scroll-mt-24 md:scroll-mt-10"
            >
              <Heading variant="h2" className="mb-8 text-5xl font-bold">
                {letter}
              </Heading>

              {letterEntries.map((entry) => {
                const termCleaned = cleanTerm(false, entry.term || '');
                const slug = entry.slug?.current || '';

                return (
                  <div
                    key={entry._id || `entry-${termCleaned}`}
                    className="mb-12 scroll-mt-24 md:scroll-mt-10"
                    data-term={termCleaned}
                  >
                    {entry.createFullPageEntry && slug ? (
                      <div>
                        <Link
                          href={`/glossary/${slug}`}
                          className="group outline-none"
                        >
                          <div className="flex flex-row">
                            <Heading
                              variant="h3"
                              className="mb-2 group-hover:text-pink"
                            >
                              {entry.term}
                            </Heading>
                            <div className="text-lg font-bold text-black group-hover:text-pink">
                              &nbsp;→
                            </div>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-row">
                        <Heading variant="h3" className="mb-2">
                          {entry.term}
                        </Heading>
                      </div>
                    )}

                    {entry.shortEntry && <Body body={entry.shortEntry} />}
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}
