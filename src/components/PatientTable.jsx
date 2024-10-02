import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { toast } from "sonner";
import { EditPatient } from "@/components/EditPatient";
import DeleteDialog from "./DeleteDialog";
import { deletePatient } from "@/server/actions/delete-patient";
import { useState } from "react";

export default function PatientTable({ patients = [], setPatients }) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handelDelete = (id) => async () => {
    try {
      const res = await deletePatient({ patientId: id });
      if (res.data) {
        setPatients((prev) => prev.filter((patient) => patient.id !== id));
        setDialogOpen(false);
        toast.success("Patient deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting patient");
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Assigned Doctor</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients &&
            patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-bold">{patient?.name}</div>
                </TableCell>
                <TableCell>
                  <div>{patient?.age}</div>
                </TableCell>
                <TableCell>
                  <div>{patient?.gender}</div>
                </TableCell>
                <TableCell>
                  <div>{patient?.assignedDoctor?.name || ""}</div>
                </TableCell>
                <TableCell className="text-right">
                  {/* Edit Patient Dialog */}
                  <EditPatient patient={patient} setPatients={setPatients} />
                  {/* Delete Patient Dialog */}
                  <DeleteDialog
                    title={"Delete Patient"}
                    description={
                      "Are you sure you want to delete this patient?"
                    }
                    onClick={handelDelete(patient?.id)}
                    isDialogOpen={isDialogOpen}
                    setDialogOpen={setDialogOpen}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
