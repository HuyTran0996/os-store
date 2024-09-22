import * as React from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default function ChartBar({
  dataset,
  unit,
  dataKey,
  label,
  isLoading,
  color,
}) {
  const valueFormatter = (value) => {
    if (!value) {
      return `${value}${unit}`;
    } else {
      return `${value.toLocaleString()}${unit}`;
    }
  };
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
            //Note: big number will cover the label, bad for ux-ui
            // label: unit,
          },
        ]}
        series={[
          { dataKey: dataKey, label: label, valueFormatter, color: color },
        ]}
        height={400}
        sx={{
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: "translateX(-10px)",
          },
        }}
      />
    </div>
  );
}
