import { fetchParityData } from '../fetch-parity-data';
import type { ParityQueryParams } from '../fetch-parity-data';

export type DailyUptimeMetricsResponse = {
  date: string;
  relay_chain: 'polkadot' | 'kusama' | 'solo';
  chain: string;
  target_block_time: number;
  uptime_1day: number;
  uptime_7days: number;
  uptime_30days: number;
}[];

export const getDailyUptimeMetrics = async (
  params: ParityQueryParams['queryParams'],
): Promise<DailyUptimeMetricsResponse> => {
  return fetchParityData({
    endpoint: 'daily_uptime',
    queryParams: params,
  });
};
