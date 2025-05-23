import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';

import { bannerSelection } from '../selections/banner';

export async function getBanner(isDraftMode: boolean) {
  const bannerQuery = q('*')
    .filterByType('banner')
    .grab$({
      ...bannerSelection,
    })
    .slice(0)
    .nullable();

  try {
    const result = await runQuery(bannerQuery, {}, isDraftMode);
    return result;
  } catch (error) {
    console.error('Error fetching banner:', error);
    return null;
  }
}
