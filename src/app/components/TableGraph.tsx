"use client";
import { ResponsiveContainer, AreaChart, Area, YAxis } from "recharts";

type TableGraphProps = {
  sparklineIn7Days: number[];
  graphId: string;
};

export default function TableGraph({ sparklineIn7Days, graphId }: TableGraphProps) {
  const gradientId = `colorAreaChart-${graphId}`;
  const formattedData = sparklineIn7Days.map((price) => ({
    price,
  }));
  return (
    <ResponsiveContainer width="100%" height={50} minWidth={110}>
      <AreaChart data={formattedData}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="80%" stopColor="#7474F2" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#7474F2" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <YAxis hide={true} domain={["dataMin", "dataMax"]} />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#7878FA"
          strokeWidth="2"
          fill={`url(#${gradientId})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
