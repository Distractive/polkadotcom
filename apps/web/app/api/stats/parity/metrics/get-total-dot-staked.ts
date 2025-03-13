import { getStakingMetrics } from '../endpoints/staking';

import { getLastDayOfPreviousMonth } from '../../utils/get-last-day-previous-month';

export const getTotalDOTStaked = async () => {
  const date = getLastDayOfPreviousMonth();

  const response = await getStakingMetrics({
    chain: 'polkadot',
    relay_chain: 'polkadot',
    start_date: getLastDayOfPreviousMonth(),
    end_date: getLastDayOfPreviousMonth(),
  });

  const totalDOTStaked = `${response[0]?.total_dot_staked}`;

  return totalDOTStaked;
};
