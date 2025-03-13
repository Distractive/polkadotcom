import { getDailyFeesMetrics } from '../endpoints/daily-fees';

export const getTotalFeesUSD30d = async () => {
  const response = await getDailyFeesMetrics({});

  const truncatedValue =
    Math.trunc((response[0]?.total_fees_usd_30d as number) * 100) / 100;

  return `${truncatedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
