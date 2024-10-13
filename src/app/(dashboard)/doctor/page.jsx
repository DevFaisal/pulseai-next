"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CalendarDays, Users, UserCheck, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { doctorDetailsSelector } from "@/store/DoctorAtom";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DoctorDashboard() {
  const { data: session } = useSession();
  const doctorId = session?.user?.id;
  const doctorDetails = useRecoilValue(doctorDetailsSelector(doctorId));

  const router = useRouter();

  const [doctor] = useState({
    name: "Dr. Jane Smith",
    avatar: "/placeholder.svg?height=80&width=80",
  });

  const [stats, setStats] = useState({});

  const [recentPatients, setRecentPatients] = useState([]);

  useEffect(() => {
    if (doctorDetails?.patients) {
      // const diagnosedPatients = doctorDetails.patients.filter(
      //   (patient) => patient.diagnoses.length > 0
      // );
      // const pendingDiagnoses = doctorDetails.patients.filter(
      //   (patient) => patient.diagnoses.length === 0
      // );

      setStats({
        totalPatients: doctorDetails.patients.length,
        diagnosedPatients: 0, //diagnosedPatients.length
        pendingDiagnoses: 0, //pendingDiagnoses.length
        appointmentsToday: 8,
      });

      setRecentPatients(
        doctorDetails.patients.slice(0, 5).map((patient) => ({
          id: patient.id,
          name: patient.name,
          age: patient.age,
          lastVisit: patient.lastVisit,
          // status: patient.diagnoses.length > 0 ? "Diagnosed" : "Pending",
        }))
      );
    }
  }, []);

  // Mock chart data
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

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Diagnosed Patients
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.diagnosedPatients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Diagnoses
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingDiagnoses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Appointments
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointmentsToday}</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>{patient.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => {
                  router.push("/doctor/patients");
                }}
                variant="outline"
              >
                View All Patients
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient Diagnoses Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar options={chartOptions} data={chartData} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
