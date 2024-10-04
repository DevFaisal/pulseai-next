// "use client";

// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ScrollArea } from "@/components/ui/scroll-area";

// export function ThresholdManager({
//   thresholds,
//   newThreshold,
//   setNewThreshold,
//   handleAddThreshold,
// }) {
//   const [unit, setUnit] = React.useState("bpm");
//   const thresholdTypes = [
//     {
//       name: "Heart Rate",
//       value: "heart_rate",
//       unit: "bpm",
//     },
//     {
//       name: "Blood Glucose",
//       value: "blood_glucose",
//       unit: "mg/dL",
//     },
//     {
//       name: "Blood Pressure",
//       value: "blood_pressure",
//       unit: "mmHg",
//     },
//     {
//       name: "Respiratory Rate",
//       value: "respiratory_rate",
//       unit: "bpm",
//     },
//     {
//       name: "Temperature",
//       value: "temperature",
//       unit: "°C",
//     },
//     {
//       name: "Oxygen Saturation",
//       value: "oxygen_saturation",
//       unit: "%",
//     },
//   ];
//   const setThreshold = (value) => {
//     setUnit(thresholdTypes.find((type) => type.value === value)?.unit);
//   };
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold">Thresholds</CardTitle>
//         <CardDescription>
//           Set alert thresholds for patient vitals
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[200px] mb-4 border rounded-md">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Vital Sign</TableHead>
//                 <TableHead>Threshold</TableHead>
//                 <TableHead>Unit</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {thresholds.map((threshold) => (
//                 <TableRow key={threshold.id}>
//                   <TableCell>{threshold.name}</TableCell>
//                   <TableCell>{threshold.value}</TableCell>
//                   <TableCell>{threshold.unit}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </ScrollArea>
//         <div className="flex space-x-2">
//           <Select value={thresholdTypes.name} onValueChange={setThreshold}>
//             <SelectTrigger id="threshold" className="w-full">
//               <SelectValue placeholder="Select type" />
//             </SelectTrigger>
//             <SelectContent>
//               {thresholdTypes.map((item, index) => (
//                 <SelectItem key={index} value={item.value}>
//                   {item.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Input
//             placeholder="Value"
//             type="number"
//             value={newThreshold.value}
//             onChange={(e) =>
//               setNewThreshold({
//                 ...newThreshold,
//                 value: parseFloat(e.target.value),
//               })
//             }
//           />
//           <Select value={unit} disabled>
//             <SelectTrigger id="unit" className="w-full">
//               <SelectValue placeholder="Unit" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value={unit}>{unit}</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button onClick={handleAddThreshold}>Add</Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import React, { useState, useCallback } from "react";
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

const thresholdTypes = [
  { name: "Heart Rate", value: "heart_rate", unit: "bpm" },
  { name: "Blood Glucose", value: "blood_glucose", unit: "mg/dL" },
  { name: "Blood Pressure", value: "blood_pressure", unit: "mmHg" },
  { name: "Respiratory Rate", value: "respiratory_rate", unit: "bpm" },
  { name: "Temperature", value: "temperature", unit: "°C" },
  { name: "Oxygen Saturation", value: "oxygen_saturation", unit: "%" },
];

export function ThresholdManager({
  thresholds,
  setThresholds,
  handleAddThreshold,
}) {
  const [selectedType, setSelectedType] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const handleTypeChange = useCallback((value) => {
    setSelectedType(value);
  }, []);

  const handleAddThresholdHere = useCallback(() => {
    if (!selectedType || !minValue || !maxValue) {
      toast({
        title: "Error",
        description: "Please select a type and enter min and max values",
        variant: "destructive",
      });
      return;
    }

    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);

    if (min >= max) {
      toast.error("Minimum value must be less than maximum value");
      return;
    }

    const newThreshold = {
      id: Date.now().toString(),
      name:
        thresholdTypes.find((type) => type.value === selectedType)?.name || "",
      min,
      max,
    };
    handleAddThreshold();
    // setThresholds((prev) => [...prev, newThreshold]);
    setSelectedType("");
    setMinValue("");
    setMaxValue("");

    toast.success("Threshold range added successfully");
  }, [selectedType, minValue, maxValue, setThresholds]);

  const handleRemoveThreshold = useCallback(
    (id) => {
      setThresholds((prev) => prev.filter((threshold) => threshold.id !== id));
      toast({
        title: "Success",
        description: "Threshold range removed successfully",
      });
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
              {thresholds.map((threshold) => (
                <TableRow key={threshold.id}>
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
