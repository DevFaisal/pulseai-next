// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import {
//   Users,
//   Activity,
//   Brain,
//   HeartPulse,
//   Stethoscope,
//   Syringe,
//   AlertTriangle,
//   Clock,
// } from "lucide-react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { fetchPatients } from "@/server/actions/patients/fetch-patients";
// import PatientListUser from "@/components/patient/PatientListUser";
// import TopCard from "@/components/other/TopCard";

// export default async function PulseAIRemoteOperatorDashboard() {
//   const { user } = await getServerSession(authOptions);
//   const hospitalId = user.hospitalId;
//   const patients = await fetchPatients({ hospitalId });

//   const kpis = {
//     totalPatients: 1248,
//     criticalAlerts: 7,
//     aiInsights: 23,
//     avgResponseTime: 8,
//   };

//   const patientCategories = [
//     {
//       name: "Chronic Disease",
//       count: 523,
//       icon: <Activity className="h-4 w-4" />,
//     },
//     {
//       name: "Post-Op Care",
//       count: 187,
//       icon: <Stethoscope className="h-4 w-4" />,
//     },
//     {
//       name: "Cancer Treatment",
//       count: 312,
//       icon: <Syringe className="h-4 w-4" />,
//     },
//     {
//       name: "General Monitoring",
//       count: 226,
//       icon: <HeartPulse className="h-4 w-4" />,
//     },
//   ];

//   const recentAlerts = [
//     {
//       id: 1,
//       patient: "Emma Thompson",
//       issue: "Irregular heartbeat detected",
//       severity: "High",
//       time: "5 min ago",
//     },
//     {
//       id: 2,
//       patient: "Michael Chen",
//       issue: "Blood sugar level spike",
//       severity: "Medium",
//       time: "15 min ago",
//     },
//     {
//       id: 3,
//       patient: "Sophia Rodriguez",
//       issue: "Post-op pain increase",
//       severity: "Medium",
//       time: "30 min ago",
//     },
//   ];

//   return (
//     <main>
//       <div>
//         {/* KPIs */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
//           <TopCard
//             title="Total Patients"
//             header={patients?.data?.length || 0}
//             description="Currently under remote monitoring"
//             icon={<Users className="h-4 w-4 text-muted-foreground" />}
//             color="#606c38"
//           />
//           <TopCard
//             title="Critical Alerts"
//             header={kpis.criticalAlerts}
//             description="Patients needing immediate attention"
//             icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
//           />
//           <TopCard
//             title="AI Insights"
//             header={kpis.aiInsights}
//             description="Actionable recommendations"
//             icon={<Brain className="h-4 w-4 text-muted-foreground" />}
//           />
//           <TopCard
//             title="Average Response Time"
//             header={kpis.avgResponseTime + " mins"}
//             description="Time to resolve critical alerts"
//             icon={<Clock className="h-4 w-4 text-muted-foreground" />}
//           />
//         </div>
//         {/* Patient Categories and Real-time Monitoring */}
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
//           <Card className="rounded-none">
//             <CardHeader>
//               <CardTitle>Patient Categories</CardTitle>
//               <CardDescription>
//                 Distribution of monitored patients
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {patientCategories?.map((category) => (
//                   <div key={category.name} className="flex items-center">
//                     <div className="w-36 mr-4 flex items-center">
//                       {category.icon}
//                       <span className="ml-2">{category.name}</span>
//                     </div>
//                     <Progress
//                       value={(category.count / kpis.totalPatients) * 100}
//                       className="flex-1"
//                     />
//                     <span className="ml-4 text-sm text-muted-foreground">
//                       {category.count}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Recent Alerts and AI Insights */}
//           <Card className="rounded-none">
//             <CardHeader>
//               <CardTitle>Recent Alerts</CardTitle>
//               <CardDescription>Urgent patient notifications</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentAlerts.map((alert) => (
//                   <div
//                     key={alert.id}
//                     className="flex items-center justify-between"
//                   >
//                     <div>
//                       <p className="font-medium">{alert.patient}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {alert.issue}
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <Badge
//                         variant={
//                           alert.severity === "High" ? "destructive" : "warning"
//                         }
//                         className="mr-2"
//                       >
//                         {alert.severity}
//                       </Badge>
//                       <span className="text-xs text-muted-foreground">
//                         {alert.time}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Patient List */}
//         {patients?.data?.length > 0 ? (
//           <PatientListUser patients={patients} />
//         ) : (
//           <Card className="rounded-none">
//             <CardHeader>
//               <CardTitle>Patient List</CardTitle>
//               <CardDescription>
//                 Click on a patient to view details
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground">No patients found</p>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </main>
//   );
// }

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
  Users,
  Activity,
  Brain,
  HeartPulse,
  Stethoscope,
  Syringe,
  AlertTriangle,
  Clock,
  Baby,
  Droplets,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchPatients } from "@/server/actions/patients/fetch-patients";
import PatientListUser from "@/components/patient/PatientListUser";
import TopCard from "@/components/other/TopCard";
import { color } from "framer-motion";

export default async function PulseAIRemoteOperatorDashboard() {
  const { user } = await getServerSession(authOptions);
  const hospitalId = user.hospitalId;
  const patients = await fetchPatients({ hospitalId });

  const kpis = {
    totalPatients: 1248,
    criticalAlerts: 7,
    aiInsights: 23,
    avgResponseTime: 8,
  };

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

  const programOverview = [
    { name: "New Enrollment", icon: <Users />, color: "#e0f2fe", count: 10 },
    { name: "Chronic Disease", icon: <Activity />, color: "#fce7f3", count: 5 },
    {
      name: "Post Surgical Recovery",
      icon: <Stethoscope />,
      color: "#fef3c7",
      count: 3,
    },
    { name: "Cancer Treatment", icon: <Syringe />, color: "#fee2e2", count: 7 },
    {
      name: "Cardiac Monitoring",
      icon: <HeartPulse />,
      color: "#ffedd5",
      count: 2,
    },
    {
      name: "Respiratory Monitoring",
      icon: <HeartPulse />,
      color: "#dcfce7",
      count: 7,
    },
    { name: "Pediatric Care", icon: <Baby />, color: "#dbeafe", count: 4 },
    {
      name: "Pregnancy and Menstrual Health",
      icon: <Droplets />,
      color: "#f3e8ff",
      count: 2,
    },
  ];

  const patientTypes = [
    {
      name: "Total Patients",
      count: patients?.data?.length || 0,
      icon: <Users className="h-4 w-4" />,
      color: "#e0f2fe", // Light blue
    },
    {
      name: "Critical Patients",
      count: 2,
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "#fee2e2", // Light red
    },
    {
      name: "Follow Up Patients",
      count: 10,
      icon: <Clock className="h-4 w-4" />,
      color: "#fef3c7", // Light yellow
    },
    {
      name: "Improving Patients",
      count: 5,
      icon: <Brain className="h-4 w-4" />,
      color: "#dcfce7", // Light green
    },
    {
      name: "New Admissions",
      count: 3,
      icon: <Activity className="h-4 w-4" />,
      color: "#f3e8ff", // Light purple
    },
    {
      name: "Chronic",
      count: 7,
      icon: <HeartPulse className="h-4 w-4" />,
      color: "#fce7f3", // Light pink
    },
  ];

  return (
    <main>
      <div>
        {/* KPIs */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-6 mb-8">
          {patientTypes.map((type) => (
            <TopCard
              title={type.name}
              header={type.count}
              description="Currently under remote monitoring"
              icon={type.icon}
              color={type.color}
            />
          ))}
        </div>
        {/* Patient Categories and Real-time Monitoring */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle>Program Overview</CardTitle>
              <CardDescription>
                Distribution of monitored patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {programOverview.map((category) => (
                  <TopCard
                    title={category.name}
                    header={category.count}
                    icon={category.icon}
                    color={category.color}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts and AI Insights */}
          <Card className="rounded-none">
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
        {patients?.data?.length > 0 ? (
          <PatientListUser patients={patients} />
        ) : (
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle>Patient List</CardTitle>
              <CardDescription>
                Click on a patient to view details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No patients found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
