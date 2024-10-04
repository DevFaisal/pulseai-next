"use client";

import React from "react";
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

export function MedicationManager({
  medication,
  newMedication,
  setNewMedication,
  handleAddMedication,
}) {
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {medication?.map((medication, index) => (
                <TableRow key={index}>
                  <TableCell>{medication.name}</TableCell>
                  <TableCell>{medication.dosage}</TableCell>
                  <TableCell>{medication.frequency}</TableCell>
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
