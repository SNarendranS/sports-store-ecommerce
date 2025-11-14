import { SparkLineChart } from '@mui/x-charts';

export default function Spark() {
  return (
    <SparkLineChart
      data={[4, 7, 3, 8, 10, 12, 9]}
      width={200}
      height={60}
      color="#ff9800"
    />
  );
}
