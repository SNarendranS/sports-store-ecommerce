import { BarChart } from "@mui/x-charts";

export default function BasicBarChart() {
  return (
    <BarChart
      width={600}
      height={300}
      xAxis={[{ scaleType: 'band', data: ['Mon','Tue','Wed','Thu','Fri'] }]}
      series={[
        { data: [5, 10, 8, 15, 12], label: 'Users', color: '#2e7d32' },
      ]}
    />
  );
}
