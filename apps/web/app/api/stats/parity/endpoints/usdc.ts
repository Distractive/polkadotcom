import { fetchParityData } from '../fetch-parity-data';
import type { ParityQueryParams } from '../fetch-parity-data';

export type USDCMetricsResponse = {
  date: number;
  relay_chain: number;
  chain: string;
  sum_of_usdc: number;
}[];

export const getUSDCMetrics = async (
  params: ParityQueryParams['queryParams'],
): Promise<USDCMetricsResponse> => {
  return fetchParityData({
    endpoint: 'daily_usdc',
    queryParams: params,
  });
};
