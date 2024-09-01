import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Stock symbol is required' }, { status: 400 });
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 20);

  const period1 = Math.floor(startDate.getTime() / 1000);
  const period2 = Math.floor(endDate.getTime() / 1000);

  try {
    const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`, {
      params: {
        period1,
        period2,
        interval: '1mo',
        events: 'history',
      },
    });

    console.log(JSON.stringify(response.data, null, 2));

    const stockData = response.data.chart.result[0];
    const timestamps = stockData.timestamp;
    const closePrices = stockData.indicators.quote[0].close;

    const formattedData = timestamps.map((timestamp, index) => ({
      date: new Date(timestamp * 1000).toISOString(),
      close: closePrices[index],
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}