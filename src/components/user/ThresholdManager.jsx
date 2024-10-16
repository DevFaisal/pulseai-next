"use client";

import React, { useState, useCallback, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  deleteThreshold,
  UpdateThreshold,
} from "@/server/actions/patients/patient-threshold";

const thresholdTypes = [
  { name: "Heart Rate", value: "HEART_RATE", unit: "bpm" },
  { name: "Blood Glucose", value: "BLOOD_GLUCOSE", unit: "mg/dL" },
  { name: "Blood Pressure", value: "BLOOD_PRESSURE", unit: "mmHg" },
  { name: "Respiratory Rate", value: "RESPIRATORY_RATE", unit: "bpm" },
  { name: "Temperature", value: "TEMPERATURE", unit: "°C" },
  { name: "Oxygen Saturation", value: "OXYGEN_SATURATION", unit: "%" },
];

export function ThresholdManager({ patient }) {
  const [selectedType, setSelectedType] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [thresholds, setThresholds] = useState([]);
  const [newThreshold, setNewThreshold] = useState({
    name: "",
    value: 0,
    unit: "",
  });

  useEffect(() => {
    if (patient?.Threshold) {
      setThresholds(patient.Threshold);
    }
  }, [patient?.Threshold]);

  const handleTypeChange = useCallback(
    (value) => {
      setSelectedType(value);
    },
    []
  );

  const handleAddThreshold = useCallback(async () => {
    if (!selectedType || !minValue || !maxValue) {
      toast.error("Please fill all fields");
      return;
    }

    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);

    if (min >= max) {
      toast.error("Minimum value must be less than maximum value");
      return;
    }

    const newThreshold = {
      name:
        thresholdTypes.find((type) => type.value === selectedType)?.name || "",
      type:
        thresholdTypes.find((type) => type.value === selectedType)?.value || "",
      min,
      max,
    };

    const res = await UpdateThreshold({
      patientId: patient.id,
      threshold: newThreshold,
    });
    if (res.error) {
      toast.error(res.error);
      return;
    }
    setThresholds((prev) => [
      ...prev?.filter((threshold) => threshold.type !== selectedType),
      ,
      res.data,
    ]);

    setSelectedType("");
    setMinValue("");
    setMaxValue("");

    toast.success("Threshold range added successfully");
  }, [selectedType, minValue, maxValue, patient.id]);

  const handleRemoveThreshold = useCallback(
    async (id) => {
      const res = await deleteThreshold({ thresholdId: id });
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setThresholds((prev) => prev.filter((threshold) => threshold.id !== id));
      toast.success("Threshold range removed successfully");
    },
    [setThresholds]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Thresholds</CardTitle>
        <CardDescription>
          Set alert threshold ranges for patient vitals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] mb-4 border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vital Sign</TableHead>
                <TableHead>Min</TableHead>
                <TableHead>Max</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {thresholds.map((threshold, index) => (
                <TableRow key={index}>
                  <TableCell>{threshold.name}</TableCell>
                  <TableCell>{threshold.min}</TableCell>
                  <TableCell>{threshold.max}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveThreshold(threshold.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove threshold</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <div className="flex space-x-2">
          <Select value={selectedType} onValueChange={handleTypeChange}>
            <SelectTrigger id="threshold-type" className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {thresholdTypes.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Min"
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            aria-label="Minimum threshold value"
          />
          <Input
            placeholder="Max"
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            aria-label="Maximum threshold value"
          />
          <Button onClick={handleAddThreshold}>Add</Button>
        </div>
      </CardContent>
    </Card>
  );
}
