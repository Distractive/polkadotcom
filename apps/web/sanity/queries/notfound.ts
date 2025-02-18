import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';

import { notfoundSelection } from '../selections/notfound/notfound';

export async function getPageNotFound() {
  const query = q('*')
    .filterByType('notfound')
    .grab$({
      ...notfoundSelection,
    })
    .slice(0)
    .nullable();

  try {
    const result = await runQuery(query, {}, false);
    return result;
  } catch (error) {
    console.error('Error fetching notfound:', error);
    return null;
  }
}
