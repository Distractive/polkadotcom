import { getDailyFeesMetrics } from '../endpoints/daily-fees';

export const getTotalFeesUSD30d = async () => {
  const response = await getDailyFeesMetrics({});

  const totalFees = response[0]?.total_fees_usd_30d;

  return totalFees;
};
