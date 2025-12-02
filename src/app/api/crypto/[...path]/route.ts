import { NextRequest, NextResponse } from 'next/server';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

type RouteContext = {
  params: {
    path: string[];
  };
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const apiKey = process.env.COINGECKO_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const { path } = context.params;

    const endpoint = path.join('/');

    const searchParams = new URL(request.url).searchParams;

    const queryParams = new URLSearchParams(searchParams);
    queryParams.set('x_cg_demo_api_key', apiKey);

    const coinGeckoUrl = `${COINGECKO_BASE_URL}/${endpoint}?${queryParams.toString()}`;

    const response = await fetch(coinGeckoUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60,
      },
    });

    if (response.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('CoinGecko API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to fetch data from CoinGecko' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
