import { getStakingMetrics } from '../endpoints/staking';

import { getLastDayOfPreviousMonth } from '../../utils/get-last-day-previous-month';

export const getPercentStaked = async () => {
  const date = getLastDayOfPreviousMonth();

  const response = await getStakingMetrics({
    chain: 'polkadot',
    relay_chain: 'polkadot',
    start_date: getLastDayOfPreviousMonth(),
    end_date: getLastDayOfPreviousMonth(),
  });

  const percentStaked = `${Math.round((response[0]?.percentage_staked || 0) * 100)}%`;

  return percentStaked;
};
