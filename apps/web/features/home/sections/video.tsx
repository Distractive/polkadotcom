import { VideoBlock } from '@/features/page/blocks/video';
import type { videoSelection } from '@/sanity/selections/home/video';
import { Heading, cn } from '@shared/ui';
import type { TypeFromSelection } from 'groqd';

interface Props {
  video: TypeFromSelection<typeof videoSelection>['video'];
}

export function Video({ video }: Props) {
  return (
    <div
      id="video-pile"
      className="grid-pile -mt-header-top pt-48 md:pb-8 md:pt-64 lg:pt-24"
    >
      <article
        id="video.wrapper"
        className="grid-system col-span-full h-full  items-center justify-center overflow-hidden"
      >
        <div
          id="video.content"
          data-testid="video-pile-content"
          className={cn(
            'max-width relative z-10 col-span-12 !max-w-[80rem] px-gutter ',
            'md:w-full lg:col-span-8 lg:col-start-3',
          )}
        >
          <Heading
            variant="h2"
            className="!hyphens-none !break-normal pb-5 text-5xl  leading-[1.1] md:text-7xl"
            aria-label={video.title}
            role="heading"
          >
            {video.title}
          </Heading>
          <div id="video-block">
            <VideoBlock video={video.video} />
          </div>
        </div>
      </article>
    </div>
  );
}
