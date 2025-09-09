import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';

import { homeSelection } from '../selections/home/root';

export async function getHome(isDraftMode: boolean) {
  const query = q('*')
    .filterByType('home')
    .grab$({ ...homeSelection })
    .slice(0)
    .nullable();

  try {
    const result = await runQuery(query, {}, isDraftMode);
    console.log('Raw newsletterCTA:', result?.home.newsletterCTA);
    console.log('Full result:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Error fetching home page:', error);
  }
}
