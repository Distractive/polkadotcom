import { fetchParityData } from '../fetch-parity-data';
import type { ParityQueryParams } from '../fetch-parity-data';

export type OpenGovReferendaResultResponse = {
  relay_chain: string;
  chain: string;
  referendum_index: number;
  track: number;
  origin: string;
  ayes: number;
  nays: number;
  support: number;
  outcome: 'Approved' | 'Rejected';
  submitted_block: number;
  end_block: number;
  start_date: string;
  end_date: string;
}[];

export const getDailyOpenGovReferendaResults = async (
  params: ParityQueryParams['queryParams'],
): Promise<OpenGovReferendaResultResponse> => {
  return fetchParityData({
    endpoint: 'daily_opengov_referenda_results',
    queryParams: params,
  });
};
