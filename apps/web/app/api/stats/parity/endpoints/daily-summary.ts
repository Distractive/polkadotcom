import { fetchParityData } from '../fetch-parity-data';
import type { ParityQueryParams } from '../fetch-parity-data';

export type ParityDailySummaryMetricsResponse = {
  date: string;
  relay_chain: string;
  chain: string;
  fees: number;
  fees_usd: number;
  treasury: number;
  treasury_usd: number;
  evm_num_transactions: number;
  unique_evm_to_addresses: number;
  unique_evm_from_addresses: number;
  unique_evm_addresses: number;
  num_accounts_active_signed: number;
  num_accounts_active_signed_plus_received: number;
  evm_active: number;
  num_accounts_active_signed_combined: number;
  num_accounts_active_signed_plus_received_combined: number;
  num_events: number;
  num_transactions_signed: number;
  num_transactions_combined: number;
  num_transfers: number;
  num_transfers_combined: number;
  transfer_amount_usd: number;
  num_xcm_failed: number;
  num_xcm_messages: number;
  num_xcm_transferred: number;
  num_new_accounts: number;
  num_killed_accounts: number;
  num_remarked: number;
  num_extrinsic_success: number;
  num_extrinsic_failed: number;
}[];

export const getDailySummaryMetrics = async (
  params: ParityQueryParams['queryParams'],
): Promise<ParityDailySummaryMetricsResponse> => {
  return fetchParityData({
    endpoint: 'daily_summary',
    queryParams: params,
  });
};
