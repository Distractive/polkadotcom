import { getMonthlyUniqueAccountsMetrics } from '../endpoints/monthly-unique-accounts';

import { getLastDayOfPreviousMonth } from '../../utils/get-last-day-previous-month';

export const getUniqueAccounts = async () => {
  const date = getLastDayOfPreviousMonth();

  const response = await getMonthlyUniqueAccountsMetrics({
    relay_chain: 'polkadot',
    chain: 'ecosystem',
    start_date: getLastDayOfPreviousMonth(),
    end_date: getLastDayOfPreviousMonth(),
  });

  return response[0]?.number_of_unique_addresses;
};
