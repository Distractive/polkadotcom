import { getUSDCMetrics } from '../endpoints/usdc';
import { getUSDTMetrics } from '../endpoints/usdt';

export const getTotalStablecoinsUSD = async () => {
  const usdcResponse = await getUSDCMetrics({
    relay_chain: 'polkadot',
    chain: 'polkadot_asset_hub',
  });

  console.log('USDC response: ', usdcResponse);

  const usdtResponse = await getUSDTMetrics({
    relay_chain: 'polkadot',
    chain: 'polkadot_asset_hub',
  });

  console.log('USDT response: ', usdtResponse);

  if (!usdcResponse[0] || !usdtResponse[0]) {
    return null;
  }
  const total = usdcResponse[0].sum_of_usdc + usdtResponse[0].sum_of_usdt;

  console.log('Stable coins total: ', total);

  return total;
};
