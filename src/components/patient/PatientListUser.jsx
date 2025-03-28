"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { encryptId } from "@/lib/encryption";
import useUserStore from "@/store/useUserStore";
import { useEffect } from "react";
export default function PatientListUser({ patients }) {
  const router = useRouter();
  const { users, loading, error, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePatientClick = (id) => {
    // router.push(`user/patient/${encryptId(String(id))}`);
    router.push(`user/patient/${id}`)
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
              {/* <TableHead>Doctor Assigned</TableHead> */}
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users?.map((patient, index) => (
                <TableRow
                  key={patient.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handlePatientClick(patient.id)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{patient.name || 'N/A'}</TableCell>
                  <TableCell>{new Date().getFullYear() - new Date(patient.dob).getFullYear() || 'N/A'}</TableCell>
                  <TableCell>{patient.gender || "N/A"}</TableCell>
                  {/* <TableCell>{patient.doctor?.name}</TableCell> */}
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
