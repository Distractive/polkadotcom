import { getDailyStakingParticipationMetrics } from '../endpoints/daily-staking-participation';

export const getTotalStakers = async () => {
  const response = await getDailyStakingParticipationMetrics({
    relay_chain: 'polkadot',
    chain: 'polkadot',
  });

  const totalStakers =
    (response[0]?.number_of_nominators ?? 0) +
    (response[0]?.number_of_pool_members ?? 0);

  return totalStakers;
};
