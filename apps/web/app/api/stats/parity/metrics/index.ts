import { getPolkadotUptime30d } from './get-30d-polkadot-uptime';
import { getActiveValidators } from './get-active-validators';
import { getApprovedReferendums } from './get-approved-referendums';
import { getAverageMonthlyGovernanceVoters } from './get-avg-monthly-governance-voters';
import { getTotalNominators } from './get-nominators';
import { getPercentDOTSupplyStaked } from './get-percent-staked';
import { getTotalDOTStaked } from './get-total-dot-staked';
import { getTotalFeesUSD30d } from './get-total-fees-usd-30d';
import { getTotalReferendums } from './get-total-referendums';
import { getTotalStablecoinsUSD } from './get-total-stablecoins';
import { getTotalStakers } from './get-total-stakers';
import { getTreasuryBalanceUSD } from './get-treasury-balance-usd';
import { getUniqueAccounts } from './get-unique-accounts';

export const metricFetchers = {
  getActiveValidators,
  getApprovedReferendums,
  getAverageMonthlyGovernanceVoters,
  getPercentDOTSupplyStaked,
  getPolkadotUptime30d,
  getTotalDOTStaked,
  getTotalFeesUSD30d,
  getTotalNominators,
  getTotalReferendums,
  getTotalStablecoinsUSD,
  getTotalStakers,
  getTreasuryBalanceUSD,
  getUniqueAccounts,
};

export type MetricFetchers = typeof metricFetchers;
