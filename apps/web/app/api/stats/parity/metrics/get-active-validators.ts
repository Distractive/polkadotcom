import { getActiveValidatorsMetrics } from '../endpoints/active-validators';

import { getLastDayOfPreviousMonth } from '../../utils/get-last-day-previous-month';

export const getActiveValidators = async () => {
  const date = getLastDayOfPreviousMonth();

  const response = await getActiveValidatorsMetrics({
    chain: 'polkadot',
    relay_chain: 'polkadot',
    start_date: getLastDayOfPreviousMonth(),
    end_date: getLastDayOfPreviousMonth(),
  });

  const activeValidators =
    response[0]?.number_of_active_validators.toLocaleString();

  return activeValidators;
};
