"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const patientData = [
  { month: "Jan", newPatients: 65 },
  { month: "Feb", newPatients: 59 },
  { month: "Mar", newPatients: 80 },
  { month: "Apr", newPatients: 81 },
  { month: "May", newPatients: 56 },
  { month: "Jun", newPatients: 55 },
  { month: "Jul", newPatients: 40 },
  { month: "Aug", newPatients: 30 },
  { month: "Sep", newPatients: 20 },
  { month: "Oct", newPatients: 10 },
  { month: "Nov", newPatients: 5 },
  { month: "Dec", newPatients: 1 },
];

export default function PatientDataChart() {
  return (
    <ChartContainer
      config={{
        newPatients: {
          label: "New Patients",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={patientData}>
          <XAxis
            dataKey="month"
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="newPatients"
            fill="var(--color-newPatients)"
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
