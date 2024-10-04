// "use client";

// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// export function PatientInformation({ patient }) {
//   if (!patient) return null;

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Patient Information</CardTitle>
//         <CardDescription>View and manage patient details</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <InfoItem label="Name" value={patient.name} />
//             <InfoItem label="Age" value={patient.age} />
//             <InfoItem label="Gender" value={patient.gender} />
//             <InfoItem label="Contact Info" value={patient.contact} />
//           </div>
//           <InfoItem
//             label="Clinical Notes"
//             value={patient.clinicalNotes || "No clinical notes available."}
//           />
//           <InfoItem
//             label="Diagnosis"
//             value={patient.diagnosis || "No diagnosis available."}
//           />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function InfoItem({ label, value }) {
//   return (
//     <div>
//       <h4 className="font-medium text-sm text-muted-foreground">{label}</h4>
//       <p className="mt-1">{value}</p>
//     </div>
//   );
// }

"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import ActionDrawer, { VitalsDrawerExample } from "@/components/Drawer";

export function PatientInformation({ patient }) {
  if (!patient) return null;
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              Patient Information
            </CardTitle>
            <CardDescription>View and manage patient details</CardDescription>
          </div>
          <StatusBadge status={patient.status || "Stable"} />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Name" value={patient.name} />
              <InfoItem label="Age" value={patient.age.toString()} />
              <InfoItem label="Gender" value={patient.gender} />
              <InfoItem label="Blood Type" value={patient.bloodType} />
            </div>
            <InfoItem
              label="Clinical Notes"
              value={patient.doctorNote || "No clinical notes available."}
            />
            <InfoItem
              label="Diagnosis"
              value={patient.icdCode || "No diagnosis available."}
            />
            <VitalsDrawerExample />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-muted-foreground">{label}</h4>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusColors = {
    stable: "bg-green-100 text-green-800",
    critical: "bg-red-100 text-red-800",
    recovering: "bg-yellow-100 text-yellow-800",
  };

  return (
    <Badge className={`${statusColors[status]} px-2 py-1 text-xs font-medium`}>
      {/* {status.charAt(0).toUpperCase() + status.slice(1) || } */}
      {status || "Unknown"}
    </Badge>
  );
}
