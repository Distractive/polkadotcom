import { getMonthlyOpenGovParticipationMetrics } from '../endpoints/monthly-opengov-participation';

import { getLastDayOfPreviousMonth } from '../../utils/get-last-day-previous-month';

export const getAverageMonthlyGovernanceVoters = async () => {
  const date = new Date(2023, 0, 1);

  const response = await getMonthlyOpenGovParticipationMetrics({
    chain: 'polkadot',
    relay_chain: 'polkadot',
    start_date: new Date('2025-01-01').toISOString().split('T')[0],
    end_date: getLastDayOfPreviousMonth(),
  });

  const responseTotalVoters = response.reduce(
    (acc, curr) => acc + curr.number_of_voters,
    0,
  );
  const responseTotalMonths = response.length / 2;

  // Total voters from 6/2023 to 12/2024 was 362,989
  const averageVoters =
    (responseTotalVoters + 362989) / (responseTotalMonths + 19);

  const roundedAverageVoters = Math.round(averageVoters);

  return roundedAverageVoters;
};
