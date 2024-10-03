// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { toast } from "sonner";
// import { EditPatient } from "@/components/EditPatient";
// import DeleteDialog from "./DeleteDialog";
// import { deletePatient } from "@/server/actions/patients/delete-patient";
// import { useState } from "react";

// export default function PatientTable({
//   patients = [],
//   setPatients,
//   doctors = [],
// }) {
//   const [isDialogOpen, setDialogOpen] = useState(false);

//   const handelDelete = (id) => async () => {
//     try {
//       const res = await deletePatient({ patientId: id });
//       if (res.data) {
//         setPatients((prev) => prev.filter((patient) => patient.id !== id));
//         setDialogOpen(false);
//         toast.success("Patient deleted successfully");
//       }
//     } catch (error) {
//       toast.error("Error deleting patient");
//     }
//   };

//   return (
//     <>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Age</TableHead>
//             <TableHead>Gender</TableHead>
//             <TableHead>Assigned Doctor</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {patients &&
//             patients.map((patient, index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   <div className="font-bold">{patient?.name}</div>
//                 </TableCell>
//                 <TableCell>
//                   <div>{patient?.age}</div>
//                 </TableCell>
//                 <TableCell>
//                   <div>{patient?.gender}</div>
//                 </TableCell>
//                 <TableCell>
//                   <div>{patient?.assignedDoctor?.name || ""}</div>
//                 </TableCell>
//                 <TableCell className="text-right">
//                   {/* Edit Patient Dialog */}
//                   <EditPatient
//                     patient={patient}
//                     setPatients={setPatients}
//                     doctors={doctors}
//                   />
//                   {/* Delete Patient Dialog */}
//                   <DeleteDialog
//                     title={"Delete Patient"}
//                     description={
//                       "Are you sure you want to delete this patient?"
//                     }
//                     onClick={handelDelete(patient?.id)}
//                     isDialogOpen={isDialogOpen}
//                     setDialogOpen={setDialogOpen}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>
//     </>
//   );
// }

"use client";

import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditPatient } from "@/components/EditPatient";
import DeleteDialog from "@/components/DeleteDialog";
import { deletePatient } from "@/server/actions/patients/delete-patient";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Stethoscope } from "lucide-react";
import { useSession } from "next-auth/react";
import { fetchDoctors } from "@/server/actions/doctors/fetch-doctors";
import { useSetRecoilState } from "recoil";
import { doctorDataState } from "@/store/DoctorAtom";

export default function PatientTable({ patients = [], setPatients }) {
  

  const handleDeletePatient = async (id) => {
    try {
      const res = await deletePatient({ patientId: id });
      if (res.data) {
        setPatients((prev) => prev.filter((patient) => patient.id !== id));
        toast.success("Patient deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting patient");
    }
  };

  return (
    <div className="w-full overflow-auto rounded-lg border border-gray-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[250px] font-bold">Patient</TableHead>
            <TableHead className="w-[100px] font-bold">Age</TableHead>
            <TableHead className="w-[100px] font-bold">Gender</TableHead>
            <TableHead className="w-[250px] font-bold">
              Assigned Doctor
            </TableHead>
            <TableHead className="w-[150px] text-right font-bold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                  <AvatarFallback>
                    {patient.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Patient ID: {patient.id}
                  </p>
                </div>
              </TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>
                <Badge variant="outline">{patient.gender}</Badge>
              </TableCell>
              <TableCell>
                {patient.assignedDoctor ? (
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={patient.assignedDoctor.avatarUrl}
                        alt={patient.assignedDoctor.name}
                      />
                      <AvatarFallback>
                        <Stethoscope className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span>{patient.assignedDoctor.name}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground italic">
                    Not assigned
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <EditPatient patient={patient} setPatients={setPatients} />
                <DeleteDialog
                  title={`Remove ${patient.name}`}
                  description={`Are you sure you want to remove ${patient.name} from the hospital? This action cannot be undone.`}
                  onDelete={() => handleDeletePatient(patient.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
