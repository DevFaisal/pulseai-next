"use client";

import { toast } from "sonner";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { EditPatient } from "@/components/patient/EditPatient";
import DeleteDialog from "@/components/other/DeleteDialog";
import { deletePatient } from "@/server/actions/patients/delete-patient";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Stethoscope } from "lucide-react";

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
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="w-[250px] font-bold">Patient</TableHead>
          <TableHead className="w-[100px] font-bold">Age</TableHead>
          <TableHead className="w-[100px] font-bold">Gender</TableHead>
          <TableHead className="w-[250px] font-bold">Assigned Doctor</TableHead>
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
                  {patient.firstName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {patient.firstName + " " + patient.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Patient ID: {patient.id}
                </p>
              </div>
            </TableCell>
            <TableCell>
              {patient.dateOfBirth
                ? new Date().getFullYear() -
                  new Date(patient.dateOfBirth).getFullYear()
                : "N/A"}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{patient.gender.toUpperCase()}</Badge>
            </TableCell>
            <TableCell>
              {patient.Doctor ? (
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    {/* <AvatarImage
                      src={patient.assignedDoctor.avatarUrl}
                      alt={patient.Doctor.name}
                    /> */}
                    <AvatarFallback>
                      <Stethoscope className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span>{patient.Doctor.name}</span>
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
  );
}
