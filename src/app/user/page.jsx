"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Users,
  Activity,
  Brain,
  HeartPulse,
  Stethoscope,
  Syringe,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { patientsDetailsState } from "@/store/HospitalAtom";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import Loading from "@/components/other/Loading";
import { AdminPatientsSelector } from "@/store/AdminAtom";

export default function PulseAIRemoteOperatorDashboard() {
  const [patientsDetails, setPatientsDetails] =
    useRecoilState(patientsDetailsState);
  const fetchedPatientsDetails = useRecoilValueLoadable(AdminPatientsSelector);

  useEffect(() => {
    if (fetchedPatientsDetails.state === "hasValue") {
      setPatientsDetails(fetchedPatientsDetails.contents);
    }
    if (fetchedPatientsDetails.state === "loading") {
      <Loading />;
    }
    if (fetchedPatientsDetails.state === "hasValue") {
      setPatientsDetails(fetchedPatientsDetails.contents);
    }
  }, [fetchedPatientsDetails]);

  const router = useRouter();
  const kpis = {
    totalPatients: 1248,
    criticalAlerts: 7,
    aiInsights: 23,
    avgResponseTime: 8,
  };

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

  const isLoading = !patientsDetails || patientsDetails.length === 0;

  return (
    <main>
      <div>
        {/* KPIs */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <TopCard
            title="Total Patients"
            header={patientsDetails?.length || 0}
            description="Currently under remote monitoring"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <TopCard
            title="Critical Alerts"
            header={kpis.criticalAlerts}
            description="Patients needing immediate attention"
            icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
          />
          <TopCard
            title="AI Insights"
            header={kpis.aiInsights}
            description="Actionable recommendations"
            icon={<Brain className="h-4 w-4 text-muted-foreground" />}
          />
          <TopCard
            title="Average Response Time"
            header={kpis.avgResponseTime + " mins"}
            description="Time to resolve critical alerts"
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          />
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
                {patientCategories?.map((category) => (
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
                          alert.severity === "High" ? "destructive" : "warning"
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
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner size={"large"} />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Doctor Assigned</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientsDetails &&
                    patientsDetails?.map((patient, index) => (
                      <TableRow
                        key={patient.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() =>
                          router.push(`/user/patient/${patient.id}`)
                        }
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {patient.firstName + " " + patient.lastName}
                        </TableCell>
                        <TableCell>
                          {new Date().getFullYear() -
                            new Date(patient.dateOfBirth).getFullYear()}
                        </TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.Doctor?.name}</TableCell>
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
                            {patient.status || "Stable"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function TopCard({ title, header, description, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{header}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
