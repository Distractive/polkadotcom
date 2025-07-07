import { getTreasuryAssetsMetrics } from '../endpoints/treasury-assets';

export const getDailyTreasuryBalanceUSD = async () => {
  const date = new Date();
  date.setDate(date.getDate() - 3);

  const response = await getTreasuryAssetsMetrics({
    relay_chain: '',
    chain: '',
    start_date: date.toISOString().split('T')[0],
    end_date: date.toISOString().split('T')[0],
  });

  const balance = response.reduce((sum, obj) => sum + obj.balance_usd, 0);

  return balance;
};
