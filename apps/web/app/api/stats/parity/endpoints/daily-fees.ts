import { fetchParityData } from '../fetch-parity-data';
import type { ParityQueryParams } from '../fetch-parity-data';

export type DailyFeesResponse = {
  date: string;
  relay_chain: 'polkadot' | 'kusama' | 'solo';
  chain: string;
  total_fees: number;
  total_fees_usd: number;
  total_fees_usd_30d: number;
}[];

export const getDailyFeesMetrics = async (
  params: ParityQueryParams['queryParams'],
): Promise<DailyFeesResponse> => {
  return fetchParityData({
    endpoint: 'daily_fees',
    queryParams: params,
  });
};
