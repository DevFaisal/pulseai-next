"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import { useEffect } from "react";

export default function PatientListUser() {
  const router = useRouter();
  const { users, loading, error, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePatientClick = (id) => {
    router.push(`user/patient/${id}`);
  };

  // Sort users by lastLoginDate in descending order (newest first)
  const sortedUsers = [...(users || [])].sort((a, b) => {
    if (!a.lastLoginDate && !b.lastLoginDate) return 0;
    if (!a.lastLoginDate) return 1;
    if (!b.lastLoginDate) return -1;
    return new Date(b.lastLoginDate) - new Date(a.lastLoginDate);
  });

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getBadgeVariant = (status) => {
    const variants = {
      Stable: "secondary",
      "Needs Attention": "warning",
      Critical: "destructive",
    };
    return variants[status] || "default";
  };

  if (error) {
    return (
      <Card className="mb-8 rounded-none">
        <CardContent className="p-6">
          <div className="text-red-500">Error loading patients: {error}</div>
        </CardContent>
      </Card>
    );
  }

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
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span>Loading patients...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : sortedUsers.length > 0 ? (
              sortedUsers.map((patient) => (
                <TableRow
                  key={patient.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handlePatientClick(patient.id)}
                >
                  <TableCell>{patient.id}</TableCell>
                  <TableCell className="flex gap-2">
                    <span className="font-semibold">
                      {patient.name?.charAt(0).toUpperCase() + patient.name?.slice(1).toLowerCase() || "n/a"}
                    </span>
                    <span>{patient.lastName?.charAt(0).toUpperCase() + patient.lastName?.slice(1).toLowerCase()}</span>
                  </TableCell>
                  <TableCell>{calculateAge(patient.dob) || "n/a"}</TableCell>
                  <TableCell>
                    {patient.gender?.charAt(0).toUpperCase() + patient.gender?.slice(1).toLowerCase() || "n/a"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(patient.status)}>{patient.status || "Stable"}</Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No patients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
