import { getMonthlyUniqueAccountsMetrics } from '../endpoints/monthly-unique-accounts';

import { getLastDayOfPreviousMonth } from '../../utils/get-last-day-previous-month';

export const getUniqueAccounts = async () => {
  const date = getLastDayOfPreviousMonth();

  const response = await getMonthlyUniqueAccountsMetrics({
    relay_chain: 'polkadot',
    chain: 'polkadot',
    start_date: getLastDayOfPreviousMonth(),
    end_date: getLastDayOfPreviousMonth(),
  });

  const rawValue = Number(response[0]?.number_of_unique_addresses ?? 0);
  const valueInMillions = rawValue / 1_000_000;
  const roundedUp = Math.ceil(valueInMillions * 100) / 100;
  return `${roundedUp.toFixed(2)} million`;
};
