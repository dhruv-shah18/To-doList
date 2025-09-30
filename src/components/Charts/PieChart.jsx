import { PieChart } from "@mui/x-charts/PieChart";

const settings = {
  margin: { right: 5 },
  width: 120,    // ✅ reduced width
  height: 140,   // ✅ reduced height
  slotProps: {
    legend: { hidden: true }, // recommended way to hide legend
  },
};

export default function DonutChart({ data }) {
  return (
    <>
      <p>Analysis of Tasks</p>
      <PieChart
        series={[
          {
            innerRadius: 30,   // ✅ smaller donut hole
            outerRadius: 60,   // ✅ smaller outer circle
            data,
            arcLabel: () => "", // ✅ hides value labels
          },
        ]}
        {...settings}
      />
    </>
  );
}
