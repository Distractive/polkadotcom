import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';

import { homeSelection } from '../selections/home/root';

export async function getHome(isDraftMode: boolean) {
  const query = q('')
    .grab({ ...homeSelection })
    .nullable();

  try {
    console.log('isdraft:', isDraftMode);
    const result = await runQuery(query, {}, false);
    console.log('result:', result);
    return result;
  } catch (error) {
    console.error('Error fetching home page:', error);
  }
}
