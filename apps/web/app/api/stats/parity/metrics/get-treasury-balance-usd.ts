import { getTreasuryAssetsMetrics } from '../endpoints/treasury-assets';

import { getLastDayOfPreviousMonth } from '../../utils/get-last-day-previous-month';

export const getTreasuryBalanceUSD = async () => {
  const date = getLastDayOfPreviousMonth();

  const response = await getTreasuryAssetsMetrics({
    chain: 'polkadot',
    relay_chain: 'polkadot',
    start_date: getLastDayOfPreviousMonth(),
    end_date: getLastDayOfPreviousMonth(),
  });

  const nominators = `$${response[0]?.balance_usd.toLocaleString()}`;

  return nominators;
};
