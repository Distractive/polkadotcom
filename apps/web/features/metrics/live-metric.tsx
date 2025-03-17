import { getActiveValidators } from '@/app/api/stats/parity/metrics/get-active-validators';
import { getApprovedReferendums } from '@/app/api/stats/parity/metrics/get-approved-referendums';
import { getAverageMonthlyGovernanceVoters } from '@/app/api/stats/parity/metrics/get-avg-monthly-governance-voters';
import { getNominators } from '@/app/api/stats/parity/metrics/get-nominators';
import { getPercentDOTSupplyStaked } from '@/app/api/stats/parity/metrics/get-percent-staked';
import { getPolkadotUptime30d } from '@/app/api/stats/parity/metrics/get-30d-polkadot-uptime';
import { getTotalDOTStaked } from '@/app/api/stats/parity/metrics/get-total-dot-staked';
import { getTotalFeesUSD30d } from '@/app/api/stats/parity/metrics/get-total-fees-usd-30d';
import { getTotalReferendums } from '@/app/api/stats/parity/metrics/get-total-referendums';
import { getTotalStablecoinsUSD } from '@/app/api/stats/parity/metrics/get-total-stablecoins';
import { getTotalStakers } from '@/app/api/stats/parity/metrics/get-total-stakers';
import { getTreasuryBalanceUSD } from '@/app/api/stats/parity/metrics/get-treasury-balance-usd';
import { getUniqueAccounts } from '@/app/api/stats/parity/metrics/get-unique-accounts';

export const metricFetchers = {
  totalFeesUSD30d: getTotalFeesUSD30d,
  activeValidators: getActiveValidators,
  totalReferendums: getTotalReferendums,
  totalNominators: getNominators,
  percentDOTSupplyStaked: getPercentDOTSupplyStaked,
  totalDOTStaked: getTotalDOTStaked,
  treasuryBalanceUSD: getTreasuryBalanceUSD,
  totalStablecoinsUSD: getTotalStablecoinsUSD,
  uniqueAccounts: getUniqueAccounts,
  polkadotUptime30d: getPolkadotUptime30d,
  totalStakers: getTotalStakers,
  approvedReferendums: getApprovedReferendums,
  averageMonthlyGovernanceVoters: getAverageMonthlyGovernanceVoters,
};

interface MetricProps {
  metric?: keyof typeof metricFetchers;
  fallbackMetric?: string | null;
  addDollarSign?: boolean | null;
  displayInMillions?: boolean | null;
}

export const formatToMillions = (number: number): string => {
  return `${(number / 1000000).toFixed(1)} million`;
};

export const LiveMetric = async ({
  metric,
  fallbackMetric,
  addDollarSign,
  displayInMillions,
}: MetricProps) => {
  try {
    if (!metric) {
      return <>{fallbackMetric}</>;
    }

    let value = await metricFetchers[metric]();

    if (!value) {
      return <>{fallbackMetric}</>;
    }

    if (displayInMillions && Number(value) > 1000000) {
      value = formatToMillions(Number(value));
    }

    return (
      <>
        {addDollarSign ? '$' : ''}
        {value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}
      </>
    );
  } catch (error) {
    console.error(`Metric fetchfailed for ${metric}:`, error);
    return <>{fallbackMetric ?? 'Error loading metric'}</>;
  }
};
