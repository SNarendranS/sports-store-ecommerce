import { PieChart } from '@mui/x-charts';

export default function BasicPieChart() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 40, label: "Electronics" },
            { id: 1, value: 25, label: "Fashion" },
            { id: 2, value: 20, label: "Home" },
            { id: 3, value: 15, label: "Others" },
          ],
        },
      ]}
      width={500}
      height={300}
    />
  );
}
