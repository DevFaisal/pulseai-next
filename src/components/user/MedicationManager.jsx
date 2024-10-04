"use client";

import React, { use, useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import {
  deleteMedication,
  UpdateMedication,
} from "@/server/actions/patients/patient-medications";
import { toast } from "sonner";

export function MedicationManager({ patient }) {
  const [medication, setMedication] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
  });

  useEffect(() => {
    if (patient?.medications) {
      setMedication(patient.medications);
    }
  }, []);

  const handleAddMedication = async () => {
    const res = await UpdateMedication({
      patientId: patient.id,
      medication: newMedication,
    });

    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Medication added successfully");
    if (res.data) {
      setMedication(res.data.medications);
      setNewMedication({ name: "", dosage: "", frequency: "" });
    }
  };

  const handleRemoveMedication = async (id) => {
    const res = await deleteMedication({ medicationId: id });
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Medication removed successfully");
    setMedication((prev) => prev.filter((med) => med.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Medications</CardTitle>
        <CardDescription>Manage patient medications</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] mb-4 border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medication.map((medication, index) => (
                <TableRow key={index}>
                  <TableCell>{medication.name}</TableCell>
                  <TableCell>{medication.dosage}</TableCell>
                  <TableCell>{medication.frequency}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMedication(medication.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove Medicine</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <div className="flex space-x-2">
          <Input
            placeholder="Medication name"
            value={newMedication.name}
            onChange={(e) =>
              setNewMedication({
                ...newMedication,
                name: e.target.value,
              })
            }
          />
          <Input
            placeholder="Dosage"
            value={newMedication.dosage}
            onChange={(e) =>
              setNewMedication({
                ...newMedication,
                dosage: e.target.value,
              })
            }
          />
          <Input
            placeholder="Frequency"
            value={newMedication.frequency}
            onChange={(e) =>
              setNewMedication({
                ...newMedication,
                frequency: e.target.value,
              })
            }
          />
          <Button onClick={handleAddMedication}>Add</Button>
        </div>
      </CardContent>
    </Card>
  );
}
