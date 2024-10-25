"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import DeleteDialog from "@/components/other/DeleteDialog";
import { deletePatient } from "@/server/actions/patients/delete-patient";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Stethoscope, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { encryptId } from "@/lib/encryption";
import { Button } from "@/components/ui/button";

export default function PatientTable({ patients = [] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [deletingPatientId, setDeletingPatientId] = useState(null);

  const handleDeletePatient = async (id) => {
    setIsLoading(true);
    setDeletingPatientId(id);
    try {
      await deletePatient({ patientId: id });
      toast.success("Patient deleted successfully");
      // Optionally, you can update the patients list here or refetch the data
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast.error("Error deleting patient. Please try again.");
    } finally {
      setIsLoading(false);
      setDeletingPatientId(null);
    }
  };

  const handleEditPatient = (patientId) => {
    router.push(`patients/edit-patient?id=${encryptId(patientId)}`);
  };

  if (patients.length === 0) {
    return <div className="text-center py-4">No patients found.</div>;
  }

  return (
    <div className="overflow-x-auto">
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
                  <AvatarImage
                    src={patient.avatarUrl}
                    alt={`${patient.firstName} ${patient.lastName}`}
                  />
                  <AvatarFallback>
                    {patient.firstName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{`${patient.firstName} ${patient.lastName}`}</p>
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
                {patient.doctor ? (
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        <Stethoscope className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span>{patient.doctor.name}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground italic">
                    Not assigned
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditPatient(patient.id)}
                  className="inline-flex items-center border border-gray-100 py-4"
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <DeleteDialog
                  title={`Remove ${patient.firstName} ${patient.lastName}`}
                  description={`Are you sure you want to remove ${patient.firstName} ${patient.lastName} from the hospital? This action cannot be undone.`}
                  onDelete={() => handleDeletePatient(patient.id)}
                  isLoading={isLoading && deletingPatientId === patient.id}
                >
                  {isLoading && deletingPatientId === patient.id ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Delete
                </DeleteDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
