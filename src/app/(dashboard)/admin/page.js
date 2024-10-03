"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus } from "lucide-react";
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
import { useRecoilValue } from "recoil";
import { AdminDoctorsSelector, AdminPatientsSelector } from "@/store/AdminAtom";

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

export default function AdminDashboard() {
  const patientsSelector = useRecoilValue(AdminPatientsSelector);
  const doctorsSelector = useRecoilValue(AdminDoctorsSelector);


  const hospitalStats = [
    {
      title: "Total Doctors",
      icon: UserPlus,
      number: doctorsSelector?.length || 0,
    },
    {
      title: "Total Patients",
      icon: Users,
      number: patientsSelector?.length || 0,
    },
  ];

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

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {hospitalStats.map((stat) => (
          <HeaderCard
            key={stat.title}
            title={stat.title}
            Icon={stat.icon}
            number={stat.number}
          />
        ))}
      </div>
      <Tabs defaultValue="patients" className="mt-6">
        <TabsList>
          <TabsTrigger value="patients">Patient Growth</TabsTrigger>
        </TabsList>
        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>New Patients Over Time</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 h-[500px] w-full">
              <Bar data={patientData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HeaderCard({ title, Icon, number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{number}</div>
      </CardContent>
    </Card>
  );
}
