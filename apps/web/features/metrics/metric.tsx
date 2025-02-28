import { Suspense } from 'react';
import { getTotalFeesUSD30d } from '@/app/api/stats/parity/metrics/get-total-fees-usd-30d';

export const metricFetchers = {
  totalFeesUSD30d: getTotalFeesUSD30d,
};

export const Metric = async ({
  metric,
}: { metric: keyof typeof metricFetchers }) => {
  const value = await metricFetchers[metric]();

  return <Suspense fallback={<div>Loading...</div>}>{value}</Suspense>;
};
