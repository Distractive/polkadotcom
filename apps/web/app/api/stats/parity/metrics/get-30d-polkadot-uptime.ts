import { getDailyUptimeMetrics } from '../endpoints/daily-uptime';

export const getPolkadotUptime30d = async () => {
  const response = await getDailyUptimeMetrics({
    relay_chain: 'polkadot',
    chain: 'polkadot',
  });

  const uptime = response[0]?.uptime_30days ?? 0;

  if (uptime === 1) return '100%';

  return `${(uptime * 100).toFixed(4)}%`;
};
