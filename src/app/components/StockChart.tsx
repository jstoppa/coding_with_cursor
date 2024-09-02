'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockChart({ data }) {
  const chartData = {
    labels: data.chart.result[0].timestamp.map((timestamp) =>
      new Date(timestamp * 1000).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Stock Price',
        data: data.chart.result[0].indicators.quote[0].close,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${data.chart.result[0].meta.symbol} Stock Price - Last 20 Years`,
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 20,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}