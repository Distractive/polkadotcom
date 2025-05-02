import { fetchParityData } from '../fetch-parity-data';
import type { ParityQueryParams } from '../fetch-parity-data';

export type DailyStakingParticipationMetricsResponse = {
  chain: string;
  date: string;
  mininimum_nominator_active_stake: number;
  number_of_addresses_staking: number;
  number_of_nominators: number;
  number_of_pool_members: number;
  number_of_pools: number;
  number_of_validators: number;
  relay_chain: string;
  staked_DOT: number;
  staked_DOT_in_pools: number;
  unbonding_DOT: number;
}[];

export const getDailyStakingParticipationMetrics = async (
  params: ParityQueryParams['queryParams'],
): Promise<DailyStakingParticipationMetricsResponse> => {
  return fetchParityData({
    endpoint: 'daily_staking_participation',
    queryParams: params,
  });
};
