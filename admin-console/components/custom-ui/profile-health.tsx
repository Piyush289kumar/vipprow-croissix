import { RadialBarChart } from '@/components/charts/radial-bar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { label: 'Sales', value: 20 },
  { label: 'Marketing', value: 98 },
  { label: 'Support', value: 86 },
  { label: 'Development', value: 40 },
  { label: 'Design', value: 75 },
];

export function ProfileHealth() {
  return (
    <ChartContainer
      title='Department Performance'
      description='Quarterly performance metrics by department'
    >
      <RadialBarChart
      style={{width:"100vw"}}
        data={sampleData}
        config={{
          animated: true,
          duration: 1200,
          gradient: false,
        }}
      />
    </ChartContainer>
  );
}
