"use client";

import React, { useEffect, useState } from "react";
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
  fetchMedications,
  UpdateMedication,
} from "@/server/actions/patients/patient-medications";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MedicationManager({ patient }) {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: "",
    type: "PILL",
    frequency: "",
    duration: "",
    startDate: "",
    endDate: "",
    notes: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    schedule: [],
  });

  useEffect(() => {
    const fetchMed = async () => {
      const res = await fetchMedications({ patientId: patient?.id });
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setMedications(res.data);
    };
    fetchMed();
  }, [patient]);

  const handleAddMedication = async () => {
    const res = await UpdateMedication({
      patientId: patient.id,
      medication: {
        ...newMedication,
        schedule: calculateSchedule(newMedication),
        startDate: new Date(newMedication.startDate).toISOString(),
        endDate: new Date(newMedication.endDate).toISOString(),
      },
    });

    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Medication added successfully");
    if (res.data) {
      setMedications(res.data.medications);
      setNewMedication({
        name: "",
        type: "TABLET",
        frequency: "",
        duration: "",
        startDate: "",
        endDate: "",
        notes: "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        schedule: [],
      });
    }
  };

  const handleRemoveMedication = async (id) => {
    const res = await deleteMedication({ medicationId: id });
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Medication removed successfully");
    setMedications((prev) => prev.filter((med) => med.id !== id));
  };

  return (
    <Card className="flex flex-col justify-between w-full rounded-none h-[66vh]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Medications</CardTitle>
        <CardDescription>Manage patient medications</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] mb-4 border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medications.map((medication) => (
                <TableRow key={medication.id}>
                  <TableCell>{medication.name}</TableCell>
                  <TableCell>{medication.type}</TableCell>
                  <TableCell>{medication.frequency}</TableCell>
                  <TableCell>{medication.duration}</TableCell>
                  <TableCell>
                    {new Date(medication.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(medication.endDate).toLocaleDateString()}
                  </TableCell>
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
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Input
            placeholder="Medication name"
            value={newMedication.name}
            onChange={(e) =>
              setNewMedication({ ...newMedication, name: e.target.value })
            }
          />
          <Select
            value={newMedication.type}
            onValueChange={(value) =>
              setNewMedication({ ...newMedication, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TABLET">Tablet</SelectItem>
              <SelectItem value="CAPSULE">Capsule</SelectItem>
              <SelectItem value="INHALER">Inhaler</SelectItem>
              <SelectItem value="LIQUID">Liquid</SelectItem>
              <SelectItem value="INJECTION">Injection</SelectItem>
              <SelectItem value="DROPS">Drops</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Frequency"
            value={newMedication.frequency}
            onChange={(e) =>
              setNewMedication({ ...newMedication, frequency: e.target.value })
            }
          />
          <Input
            placeholder="Duration"
            value={newMedication.duration}
            onChange={(e) =>
              setNewMedication({ ...newMedication, duration: e.target.value })
            }
          />
          <Input
            type="date"
            placeholder="Start Date"
            value={newMedication.startDate}
            onChange={(e) =>
              setNewMedication({ ...newMedication, startDate: e.target.value })
            }
          />
          <Input
            type="date"
            placeholder="End Date"
            value={newMedication.endDate}
            onChange={(e) =>
              setNewMedication({ ...newMedication, endDate: e.target.value })
            }
          />
          <Input
            placeholder="Notes"
            value={newMedication.notes}
            onChange={(e) =>
              setNewMedication({ ...newMedication, notes: e.target.value })
            }
          />
        </div>
        <Button onClick={handleAddMedication}>
          Add Medication
        </Button>
      </CardContent>
    </Card>
  );
}

function calculateSchedule(newMedication) {
  const schedule = [];
  const { frequency, duration, startDate, timezone } = newMedication;
  const start = new Date(startDate);
  const end = new Date(startDate);
  end.setDate(end.getDate() + parseInt(duration));
  const diff = end - start;
  const days = diff / (1000 * 60 * 60 * 24); 
  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    schedule.push({
      date: date.toISOString(),
      timezone,
      frequency,
    });
  }
  return schedule;
}
