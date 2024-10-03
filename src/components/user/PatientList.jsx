"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";

export default function PatientList({ patients = [], setSelectedPatient }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Patient</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                  <AvatarFallback>
                    {patient.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{patient.name}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{patient.age}</TableCell>
            <TableCell>{patient.gender}</TableCell>
            <TableCell>
              <Badge
                variant={
                  patient.status === "Stable"
                    ? "success"
                    : patient.status === "Needs Attention"
                    ? "warning"
                    : "destructive"
                }
              >
                {patient.status || "Unknown"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPatient(patient)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
