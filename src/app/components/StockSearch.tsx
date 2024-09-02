'use client';

import { useState } from 'react';
import StockChart from './StockChart';

export default function StockSearch() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/stock?symbol=${symbol}`);
    const data = await response.json();
    setStockData(data);
  };

  return (
    <div className="w-full max-w-3xl">
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {stockData && <StockChart data={stockData} />}
    </div>
  );
}