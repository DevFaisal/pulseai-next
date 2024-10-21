"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { encryptId } from "@/lib/encryption";

export default function PatientListUser({ patients }) {
  const router = useRouter();

  const handlePatientClick = (id) => {
    router.push(`user/patient/${encryptId(String(id))}`);
  };

  return (
    <Card className="mb-8 rounded-none">
      <CardHeader>
        <CardTitle>Patient List</CardTitle>
        <CardDescription>Click on a patient to view details</CardDescription>
      </CardHeader>
      <CardContent>
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
            {patients &&
              patients.data?.map((patient, index) => (
                <TableRow
                  key={patient.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handlePatientClick(patient.id)}
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
                  <TableCell>{patient.doctor?.name}</TableCell>
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
      </CardContent>
    </Card>
  );
}
