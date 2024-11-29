"use client";

import React, { useEffect, useRef, useState } from "react";
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

export function MedicationManager({ patient = {} }) {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: "",
    type: "",
    frequency: "",
    startDate: "",
    endDate: "",
    notes: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    schedule: [],
  });

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
        type: "",
        frequency: "",
        startDate: "",
        endDate: "",
        notes: "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        schedule: [],
      });
    }
  };

  const fetchMedicationsRef = useRef(null);

  useEffect(() => {
    fetchMedicationsRef.current = async () => {
      const res = await fetchMedications({ patientId: patient?.id });
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setMedications(res.data);
    };
    fetchMedicationsRef.current();
  }, [patient]);

  const handleRemoveMedication = async (id) => {
    const res = await deleteMedication({ medicationId: id });
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Medication removed successfully");
    setMedications((prev) => prev.filter((med) => med.id !== id));
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Card className="flex flex-col justify-start w-full rounded-none h-[66vh]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Medications</CardTitle>
        <CardDescription>Manage patient medications</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] mb-4 border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medications?.map((medication) => (
                <TableRow key={medication.id}>
                  <TableCell>{medication.name}</TableCell>
                  <TableCell>{medication.type}</TableCell>
                  <TableCell>{medication.frequency}</TableCell>
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
          <Select
            value={newMedication.frequency}
            onValueChange={(value) =>
              setNewMedication({ ...newMedication, frequency: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ONCE_DAILY">Once a day</SelectItem>
              <SelectItem value="TWICE_DAILY">Twice a day</SelectItem>
              <SelectItem value="THREE_TIMES_DAILY">
                Three times a day
              </SelectItem>
              <SelectItem value="FOUR_TIMES_DAILY">Four times a day</SelectItem>
              <SelectItem value="WEEKLY">Once a week</SelectItem>
              <SelectItem value="MONTHLY">Once a month</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="date"
            placeholder="Start Date"
            value={newMedication.startDate}
            min={today}
            onChange={(e) =>
              setNewMedication({ ...newMedication, startDate: e.target.value })
            }
          />
          <Input
            type="date"
            placeholder="End Date"
            value={newMedication.endDate}
            min={newMedication.startDate || today}
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
        <Button onClick={handleAddMedication}>Add Medication</Button>
      </CardContent>
    </Card>
  );
}

function calculateSchedule(newMedication) {
  const schedule = [];
  const { frequency, startDate, endDate, timezone } = newMedication;
  const start = new Date(startDate);
  const end = new Date(endDate);

  const addScheduleItem = (date, time) => {
    schedule.push({
      date: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time,
        0,
        0,
        0
      ).toISOString(),
      timezone,
      frequency,
    });
  };

  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    switch (frequency) {
      case "ONCE_DAILY":
        addScheduleItem(date, 9); // 9 AM
        break;
      case "TWICE_DAILY":
        addScheduleItem(date, 9); // 9 AM
        addScheduleItem(date, 21); // 9 PM
        break;
      case "THREE_TIMES_DAILY":
        addScheduleItem(date, 8); // 8 AM
        addScheduleItem(date, 14); // 2 PM
        addScheduleItem(date, 20); // 8 PM
        break;
      case "FOUR_TIMES_DAILY":
        addScheduleItem(date, 8); // 8 AM
        addScheduleItem(date, 12); // 12 PM
        addScheduleItem(date, 16); // 4 PM
        addScheduleItem(date, 20); // 8 PM
        break;
      case "WEEKLY":
        if (date.getDay() === 1) {
          // Monday
          addScheduleItem(date, 9); // 9 AM
        }
        break;
      case "MONTHLY":
        if (
          date.getDate() === 1 ||
          date.getDate() ===
            new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        ) {
          addScheduleItem(date, 9); // 9 AM
        }
        break;
    }
  }
  return schedule;
}
