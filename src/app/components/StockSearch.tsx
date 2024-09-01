'use client';

import { useState } from 'react';
import axios from 'axios';
import StockChart from './StockChart';

export default function StockSearch() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStockData(null);

    try {
      const response = await axios.get(`/api/stock?symbol=${symbol}`);
      setStockData(response.data);
    } catch (err) {
      setError('Error fetching stock data. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {stockData && <StockChart data={stockData} />}
    </div>
  );
}