import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';

import { navigationSelection } from '../selections/navigation/navigation';

export async function getNavigation(isDraftMode: boolean) {
  const query = q('*')
    .filterByType('navigation')
    .grab$({
      ...navigationSelection,
    })
    .slice(0)
    .nullable();

  try {
    const result = await runQuery(query, {}, isDraftMode);
    return result;
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return null;
  }
}
