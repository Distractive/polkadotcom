import { fetchParityData } from '../fetch-parity-data';
import type { ParityQueryParams } from '../fetch-parity-data';

export type MonthlyUniqueAccountsMetricsResponse = {
  month: string;
  relay_chain: string;
  chain: string;
  number_of_unique_addresses: number;
}[];

export const getMonthlyUniqueAccountsMetrics = async (
  params: ParityQueryParams['queryParams'],
): Promise<MonthlyUniqueAccountsMetricsResponse> => {
  return fetchParityData({
    endpoint: 'monthly_unique_accounts',
    queryParams: params,
  });
};
