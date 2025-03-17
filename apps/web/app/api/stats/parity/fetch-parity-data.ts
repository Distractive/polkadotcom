import { NextResponse } from 'next/server';

export interface ParityQueryParams {
  endpoint: string;
  queryParams: {
    relay_chain?: 'polkadot' | 'kusama' | 'solo';
    chain?: string;
    start_date?: string;
    end_date?: string;
  };
}

const cache = new Map();

export const fetchParityData = async ({
  endpoint,
  queryParams,
}: ParityQueryParams) => {
  // API takes 2-3 days to show data
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 4);
  const formattedDefaultDate = defaultDate.toISOString().split('T')[0];

  const paramsWithDefaults = {
    relay_chain: queryParams.relay_chain || 'polkadot',
    chain: queryParams.chain || 'ecosystem',
    start_date: (queryParams.start_date || formattedDefaultDate) as string,
    end_date: (queryParams.end_date || formattedDefaultDate) as string,
  };

  const queryString = new URLSearchParams(paramsWithDefaults).toString();
  const url = `https://shiny.data.paritytech.io/api/${endpoint}?${queryString}`;
  const cacheKey = url;

  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    const ageInSeconds = (Date.now() - timestamp) / 1000;

    if (ageInSeconds < 86400) {
      return data;
    }
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 86400 },
    });

    if (!response.ok)
      throw new Error(`API responded with status: ${response.status}`);

    const res = await response.json();

    cache.set(cacheKey, {
      data: res,
      timestamp: Date.now(),
    });

    return res;
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error);
    return NextResponse.json(
      { error: `Failed to fetch data from ${endpoint}` },
      { status: 500 },
    );
  }
};
