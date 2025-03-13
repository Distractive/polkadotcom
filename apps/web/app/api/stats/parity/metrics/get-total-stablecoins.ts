import { getUSDCMetrics } from '../endpoints/usdc';
import { getUSDTMetrics } from '../endpoints/usdt';

export const getTotalStablecoinsUSD = async () => {
  const usdcResponse = await getUSDCMetrics({
    relay_chain: 'polkadot',
    chain: 'polkadot_asset_hub',
  });

  const usdtResponse = await getUSDTMetrics({
    relay_chain: 'polkadot',
    chain: 'polkadot_asset_hub',
  });

  if (!usdcResponse[0] || !usdtResponse[0]) {
    return;
  }
  const total = usdcResponse[0].sum_of_usdc + usdtResponse[0].sum_of_usdt;

  return total;
};
