import { LineChart } from '@mui/x-charts';

export default function BasicLineChart() {
  return (
    <LineChart
      width={600}
      height={300}
      series={[
        {
          data: [10, 20, 15, 30, 45, 25],
          label: 'Sales',
          color: '#1976d2'
        }
      ]}
      xAxis={[{ scaleType: 'point', data: ['Jan','Feb','Mar','Apr','May','Jun'] }]}
    />
  );
}
