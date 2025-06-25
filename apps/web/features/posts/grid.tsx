import type { postSelection } from '@/sanity/queries/posts';
import type { TypeFromSelection } from 'groqd';

import BlogCard from '../post/card';

interface Props {
  posts: ReadonlyArray<TypeFromSelection<typeof postSelection>>;
  imageStyle?: 'image' | 'icon';
}

export function Grid({ posts, imageStyle }: Props) {
  return (
    <div className="grid-system col-span-full mb-gutter gap-y-card md:gap-card">
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className="col-span-full md:col-span-3 lg:col-span-4"
          >
            <BlogCard post={post} imageStyle={imageStyle} />
          </div>
        );
      })}
    </div>
  );
}
