import { describe, expect, it } from 'vitest';
import generateBreadcrumbs, { type PostData } from './generateBreadcrumbs';

describe('generateBreadcrumbs', () => {
  it('returns static breadcrumbs for Press Release', () => {
    const result = generateBreadcrumbs('Press Release', undefined);
    expect(result).toEqual({
      items: [
        { slug: '/community/newsroom', title: 'Newsroom' },
        { slug: '/newsroom/press-releases', title: 'Press Releases' },
      ],
    });
  });

  it('returns breadcrumbs for Case Study with valid post', () => {
    const post: PostData = {
      parent: {
        slug: 'parent-slug',
        title: 'Parent Title',
        header: { title: 'Parent Header Title' },
      },
      slug: 'post-slug',
      heading: 'Post Heading',
      headerImage: null,
      // biome-ignore lint/suspicious/noExplicitAny: <TODO: Fix>
      meta: {} as any,
    };
    const result = generateBreadcrumbs('Case Study', post);

    expect(result).toEqual({
      items: [
        { slug: '/parent-slug', title: 'Parent Header Title' },
        { slug: '/case-studies', title: 'Case Studies' },
      ],
    });
  });

  it('returns breadcrumbs for default case with valid post', () => {
    const post: PostData = {
      parent: {
        slug: 'parent-slug',
        title: 'Parent Title',
        header: { title: 'Parent Header Title' },
      },
      heading: 'Post Heading',
      slug: 'post-slug',
      headerImage: null,
      // biome-ignore lint/suspicious/noExplicitAny: <TODO: Fix>
      meta: {} as any,
    };
    const result = generateBreadcrumbs('Blog', post);

    expect(result).toEqual({
      items: [
        { slug: '/parent-slug', title: 'Parent Header Title' },
        { slug: '/parent-slug/post-slug', title: 'Post Heading' },
      ],
    });
  });

  it('handles missing post in non-Press Release types gracefully', () => {
    const resultCaseStudy = generateBreadcrumbs('Case Study', undefined);
    expect(resultCaseStudy).toEqual({
      items: [
        { slug: '', title: '' },
        { slug: '/case-studies', title: 'Case Studies' },
      ],
    });

    const resultDefault = generateBreadcrumbs('Blog', undefined);
    expect(resultDefault).toEqual({
      items: [
        { slug: '', title: '' },
        { slug: '', title: '' },
      ],
    });
  });
});
