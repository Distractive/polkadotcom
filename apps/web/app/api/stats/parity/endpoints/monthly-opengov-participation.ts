import { fetchParityData } from '../fetch-parity-data';
import type { ParityQueryParams } from '../fetch-parity-data';

export type MonthlyOpengovParticipationMetricsResponse = {
  month: string;
  relay_chain: string;
  chain: string;
  vote_type: string;
  number_of_voters: number;
  number_of_referenda: number;
}[];

export const getMonthlyOpenGovParticipationMetrics = async (
  params: ParityQueryParams['queryParams'],
): Promise<MonthlyOpengovParticipationMetricsResponse> => {
  return fetchParityData({
    endpoint: 'monthly_opengov_participation',
    queryParams: params,
  });
};
