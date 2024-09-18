import * as React from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default function ChartBar({ dataset, unit, dataKey, label, isLoading }) {
  const valueFormatter = (value) => `${value}${unit}`;
  return (
    <div style={{ width: "100%" }}>
      <BarChart
        loading={isLoading}
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",

            tickPlacement: "middle",
            tickLabelPlacement: "middle",
          },
        ]}
        yAxis={[
          {
            label: unit,
          },
        ]}
        series={[{ dataKey: dataKey, label: label, valueFormatter }]}
        height={300}
        sx={{
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: "translateX(-10px)",
          },
        }}
      />
    </div>
  );
}
