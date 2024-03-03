'use client';

import { Panel } from 'rsuite';
import { BarChart } from '@mui/x-charts';

export default function ChartPanel({ header, dataset, extraMargin }) {
  const chartSettings = {
    height: 100 + dataset.length * 40,
  };

  const series = {
    dataKey: 'avgSpent',
    label: 'Amount spent per catalogue',
    valueFormatter: (value) => `$ ${value}`,
    color: '#0a5dc2',
  };

  const margin = extraMargin ? { left: extraMargin } : {};

  return (
    <Panel header={header} className="chart-panel">
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', dataKey: 'key' }]}
        series={[series]}
        layout="horizontal"
        margin={margin}
        {...chartSettings}
      />
    </Panel>
  );
}
