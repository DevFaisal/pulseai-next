"use client";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Diagnosed Patients",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Diagnosed Patients",
    },
  },
};

export default function PatientDiagnosesOverTime() {
  return (
    <Card className='rounded-none'>
      <CardHeader>
        <CardTitle>Patient Diagnoses Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar options={chartOptions} data={chartData} />
      </CardContent>
    </Card>
  );
}
