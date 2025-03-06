import { fetchParityData } from '../fetch-parity-data';
import type { ParityQueryParams } from '../fetch-parity-data';

export type TreasuryAssetsMetricsResponse = {
  balance: number;
  balance_usd: number;
  chain: string;
  month: string;
  relay_chain: string;
}[];

export const getTreasuryAssetsMetrics = async (
  params: ParityQueryParams['queryParams'],
): Promise<TreasuryAssetsMetricsResponse> => {
  return fetchParityData({
    endpoint: 'monthly_treasury_assets',
    queryParams: params,
  });
};
