import { getTotalFeesUSD30d } from '@/app/api/stats/parity/metrics/get-total-fees-usd-30d';
import { getActiveValidators } from '@/app/api/stats/parity/metrics/get-active-validators';
import { getTotalReferendums } from '@/app/api/stats/parity/metrics/get-total-referendums';
import { getNominators } from '@/app/api/stats/parity/metrics/get-nominators';
import { getPercentDOTSupplyStaked } from '@/app/api/stats/parity/metrics/get-percent-staked';
import { getTotalDOTStaked } from '@/app/api/stats/parity/metrics/get-total-dot-staked';
import { getTreasuryBalanceUSD } from '@/app/api/stats/parity/metrics/get-treasury-balance-usd';
import { getTotalStablecoinsUSD } from '@/app/api/stats/parity/metrics/get-total-stablecoins';
import { getUniqueAccounts } from '@/app/api/stats/parity/metrics/get-unique-accounts';
import { getPolkadotUptime30d } from '@/app/api/stats/parity/metrics/get-30d-polkadot-uptime';
import { getTotalStakers } from '@/app/api/stats/parity/metrics/get-total-stakers';

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
};

interface MetricProps {
  metric?: keyof typeof metricFetchers;
  fallbackMetric?: string | null;
}

export const LiveMetric = async ({ metric, fallbackMetric }: MetricProps) => {
  try {
    if (!metric) {
      return <>{fallbackMetric}</>;
    }

    const value = await metricFetchers[metric]();

    if (!value) {
      return <>{fallbackMetric}</>;
    }

    return <>{value}</>;
  } catch (error) {
    console.error(`Metric fetchfailed for ${metric}:`, error);
    return <>{fallbackMetric ?? 'Error loading metric'}</>;
  }
};
