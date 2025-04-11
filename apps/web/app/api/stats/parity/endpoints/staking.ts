import { fetchParityData } from '../fetch-parity-data';
import type { ParityQueryParams } from '../fetch-parity-data';

export type StakingMetricsResponse = {
  block_number: number;
  chain: string;
  month: string;
  percentage_staked: number;
  relay_chain: string;
  total_dot_issuance: number;
  total_dot_staked: number;
}[];

export const getStakingMetrics = async (
  params: ParityQueryParams['queryParams'],
): Promise<StakingMetricsResponse> => {
  return fetchParityData({
    endpoint: 'monthly_percent_staked',
    queryParams: params,
  });
};
