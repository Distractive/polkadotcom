import type { metricFetchers } from '@/app/api/stats/parity/metrics/index';
import { staticMetricsStore } from '@/app/api/stats/static-metrics-store';

interface MetricProps {
  metric?: keyof typeof metricFetchers;
  fallbackMetric?: string | null;
  addDollarSign?: boolean | null;
  displayInMillions?: boolean | null;
}

const formatToMillions = (number: number): string => {
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
      return null;
    }

    let value = staticMetricsStore[metric];

    if (!value) {
      return <>{fallbackMetric}</>;
    }
    if (displayInMillions && Number(value) > 1000000) {
      value = formatToMillions(Number(value));
    }

    return (
      <>
        {addDollarSign ? '$' : ''}
        {typeof value === 'number'
          ? value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          : value}
      </>
    );
  } catch (error) {
    console.error(`Metric fetch failed for ${metric}:`, error);
    return <>{fallbackMetric ?? 'Error loading metric'}</>;
  }
};
