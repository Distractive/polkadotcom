import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';

import { homeSelection } from '../selections/home/root';

export async function getHome(isDraftMode: boolean) {
  const query = q('')
    .grab({ ...homeSelection })
    .nullable();

  try {
    const result = await runQuery(query, {}, isDraftMode);
    return result;
  } catch (error) {
    console.error('Error fetching home page:', error);
  }
}
