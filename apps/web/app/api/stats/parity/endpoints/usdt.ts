import { fetchParityData } from '../fetch-parity-data';
import type { ParityQueryParams } from '../fetch-parity-data';

export type USDCMetricsResponse = {
  date: number;
  relay_chain: number;
  chain: string;
  sum_of_usdt: number;
}[];

export const getUSDTMetrics = async (
  params: ParityQueryParams['queryParams'],
): Promise<USDCMetricsResponse> => {
  return fetchParityData({
    endpoint: 'daily_usdt',
    queryParams: params,
  });
};
