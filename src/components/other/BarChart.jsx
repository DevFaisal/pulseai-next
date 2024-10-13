"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

// Mock data
const patientData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "New Patients",
      data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 1],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  return <Bar data={patientData} options={{ responsive: true }} />;
}
