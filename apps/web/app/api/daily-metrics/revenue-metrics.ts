import { NextResponse } from 'next/server';

type RevenueMetricsResponse = Array<{
  date: string;
  relay_chain: string;
  chain: string;
  total_fees: number;
  total_fees_usd: number;
  total_fees_usd_30d: number;
}>;

export const getRevenueMetrics = async () => {
  try {
    const response = await fetch(
      'https://shiny.data.paritytech.io/api/daily_fees?relay_chain=polkadot&chain=ecosystem&start_date=2025-01-31&end_date=2025-01-31',
      {
        next: { revalidate: 86400 },
      },
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from external API' },
      { status: 500 },
    );
  }
};

export async function getTotalFees(): Promise<number> {
  const metrics: RevenueMetricsResponse = await getRevenueMetrics();
  return metrics[0]?.total_fees_usd ?? 0;
}
