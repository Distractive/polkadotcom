import { fetchParityData } from '../fetch-parity-data';
import type { ParityQueryParams } from '../fetch-parity-data';

export type ActiveValidatorsMetricsResponse = {
  chain: string;
  month: string;
  number_of_active_validators: number;
  number_of_nominators: number;
  number_of_waiting_validators: number;
  relay_chain: string;
}[];

export const getActiveValidatorsMetrics = async (
  params: ParityQueryParams['queryParams'],
): Promise<ActiveValidatorsMetricsResponse> => {
  return fetchParityData({
    endpoint: 'monthly_percent_staked',
    queryParams: params,
  });
};
