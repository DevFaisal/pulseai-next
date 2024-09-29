"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bell,
  ChevronDown,
  Users,
  Activity,
  Brain,
  HeartPulse,
  Stethoscope,
  Syringe,
  AlertTriangle,
  Clock,
  Settings,
  Search,
  Heart,
  LogOut,
} from "lucide-react";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRecoilValueLoadable } from "recoil";
import { patientsDetailsSelector } from "@/store/HospitalAtom";
import { useRouter } from "next/navigation";
import AppBar from "@/components/AppBar";

export default function PulseAIRemoteOperatorDashboard() {
  const [patients, setPatients] = useState([]);

  const { data: session } = useSession();
  const hospitalID = session?.user.hospitalId;
  const patientsDetail = useRecoilValueLoadable(
    patientsDetailsSelector(hospitalID)
  );

  const router = useRouter();
  const kpis = {
    totalPatients: 1248,
    criticalAlerts: 7,
    aiInsights: 23,
    avgResponseTime: 8,
  };

  useEffect(() => {
    if (patientsDetail.state === "hasValue") {
      setPatients(patientsDetail.contents);
    }
  }, []);

  const patientCategories = [
    {
      name: "Chronic Disease",
      count: 523,
      icon: <Activity className="h-4 w-4" />,
    },
    {
      name: "Post-Op Care",
      count: 187,
      icon: <Stethoscope className="h-4 w-4" />,
    },
    {
      name: "Cancer Treatment",
      count: 312,
      icon: <Syringe className="h-4 w-4" />,
    },
    {
      name: "General Monitoring",
      count: 226,
      icon: <HeartPulse className="h-4 w-4" />,
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      patient: "Emma Thompson",
      issue: "Irregular heartbeat detected",
      severity: "High",
      time: "5 min ago",
    },
    {
      id: 2,
      patient: "Michael Chen",
      issue: "Blood sugar level spike",
      severity: "Medium",
      time: "15 min ago",
    },
    {
      id: 3,
      patient: "Sophia Rodriguez",
      issue: "Post-op pain increase",
      severity: "Medium",
      time: "30 min ago",
    },
  ];

  const aiInsights = [
    {
      id: 1,
      insight: "Potential early-stage kidney disease detected in 3 patients",
      action: "Review and confirm",
    },
    {
      id: 2,
      insight: "15% improvement in chronic pain management this month",
      action: "Analyze treatment efficacy",
    },
    {
      id: 3,
      insight: "Unusual pattern in cancer markers for patient #1052",
      action: "Schedule immediate check-up",
    },
  ];

  // const patients = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     age: 45,
  //     condition: "Hypertension",
  //     lastChecked: "2023-09-28",
  //     status: "Stable",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     age: 62,
  //     condition: "Diabetes Type 2",
  //     lastChecked: "2023-09-27",
  //     status: "Needs Attention",
  //   },
  //   {
  //     id: 3,
  //     name: "Bob Johnson",
  //     age: 55,
  //     condition: "Post-Op Recovery",
  //     lastChecked: "2023-09-26",
  //     status: "Improving",
  //   },
  //   {
  //     id: 4,
  //     name: "Alice Brown",
  //     age: 38,
  //     condition: "Pregnancy",
  //     lastChecked: "2023-09-28",
  //     status: "Stable",
  //   },
  //   {
  //     id: 5,
  //     name: "Charlie Davis",
  //     age: 70,
  //     condition: "Chronic Heart Disease",
  //     lastChecked: "2023-09-25",
  //     status: "Critical",
  //   },
  // ];
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <AppBar />
        
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* KPIs */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Patients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpis.totalPatients}</div>
                <p className="text-xs text-muted-foreground">
                  +3% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Critical Alerts
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpis.criticalAlerts}</div>
                <p className="text-xs text-muted-foreground">
                  Requires immediate attention
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  AI Insights
                </CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpis.aiInsights}</div>
                <p className="text-xs text-muted-foreground">
                  New insights to review
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Response Time
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {kpis.avgResponseTime} min
                </div>
                <p className="text-xs text-muted-foreground">
                  -2 min from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Patient Categories and Real-time Monitoring */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Patient Categories</CardTitle>
                <CardDescription>
                  Distribution of monitored patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientCategories.map((category) => (
                    <div key={category.name} className="flex items-center">
                      <div className="w-36 mr-4 flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </div>
                      <Progress
                        value={(category.count / kpis.totalPatients) * 100}
                        className="flex-1"
                      />
                      <span className="ml-4 text-sm text-muted-foreground">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts and AI Insights */}

            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Urgent patient notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{alert.patient}</p>
                        <p className="text-sm text-muted-foreground">
                          {alert.issue}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Badge
                          variant={
                            alert.severity === "High"
                              ? "destructive"
                              : "warning"
                          }
                          className="mr-2"
                        >
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {alert.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient List */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Patient List</CardTitle>
              <CardDescription>
                Click on a patient to view details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Doctor Assigned</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientsDetail.state === "loading" ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : (
                    patientsDetail.contents &&
                    patientsDetail.contents.length > 0 &&
                    patientsDetail?.contents?.map((patient) => (
                      <TableRow
                        key={patient.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() =>
                          router.push(`/user/patient/${patient.id}`)
                        }
                      >
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.assignedDoctor?.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              patient.status === "Stable"
                                ? "secondary"
                                : patient.status === "Needs Attention"
                                ? "warning"
                                : patient.status === "Critical"
                                ? "destructive"
                                : "default"
                            }
                          >
                            {patient.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Frequently used tools and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center">
                  <Search className="h-6 w-6 mb-2" />
                  Patient Lookup
                </Button>
                <Button className="h-20 flex flex-col items-center justify-center">
                  <Activity className="h-6 w-6 mb-2" />
                  Vitals Dashboard
                </Button>
                <Button className="h-20 flex flex-col items-center justify-center">
                  <Stethoscope className="h-6 w-6 mb-2" />
                  Treatment Plans
                </Button>
                <Button className="h-20 flex flex-col items-center justify-center">
                  <Brain className="h-6 w-6 mb-2" />
                  AI Consultation
                </Button>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </main>

      {/* Patient Details Modal */}
      {/* <Dialog
        open={!!selectedPatient}
        onOpenChange={(open) => !open && setSelectedPatient(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about the selected patient
            </DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Name</h3>
                <p>{selectedPatient.name}</p>
              </div>
              <div>
                <h3 className="font-semibold">Age</h3>
                <p>{selectedPatient.age}</p>
              </div>
              <div>
                <h3 className="font-semibold">Condition</h3>
                <p>{selectedPatient.condition}</p>
              </div>
              <div>
                <h3 className="font-semibold">Last Checked</h3>
                <p>{selectedPatient.lastChecked}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status</h3>
                <Badge
                  variant={
                    selectedPatient.status === "Stable"
                      ? "secondary"
                      : selectedPatient.status === "Needs Attention"
                      ? "warning"
                      : selectedPatient.status === "Critical"
                      ? "destructive"
                      : "default"
                  }
                >
                  {selectedPatient.status}
                </Badge>
              </div>
              <div>
                <h3 className="font-semibold">Recent Vitals</h3>
                <p>Blood Pressure: 120/80 mmHg</p>
                <p>Heart Rate: 72 bpm</p>
                <p>Temperature: 98.6°F</p>
              </div>
              <div>
                <h3 className="font-semibold">Notes</h3>
                <p>
                  Patient is responding well to current treatment plan.
                  Follow-up appointment scheduled for next week.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
