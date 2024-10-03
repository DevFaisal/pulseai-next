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

export function ThresholdManager({
  thresholds,
  newThreshold,
  setNewThreshold,
  handleAddThreshold,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thresholds</CardTitle>
        <CardDescription>
          Set alert thresholds for patient vitals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] mb-4 border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vital Sign</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {thresholds.map((threshold) => (
                <TableRow key={threshold.id}>
                  <TableCell>{threshold.name}</TableCell>
                  <TableCell>{threshold.value}</TableCell>
                  <TableCell>{threshold.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <div className="flex space-x-2">
          <Input
            placeholder="Threshold name"
            value={newThreshold.name}
            onChange={(e) =>
              setNewThreshold({
                ...newThreshold,
                name: e.target.value,
              })
            }
          />
          <Input
            placeholder="Value"
            type="number"
            value={newThreshold.value}
            onChange={(e) =>
              setNewThreshold({
                ...newThreshold,
                value: parseFloat(e.target.value),
              })
            }
          />
          <Input
            placeholder="Unit"
            value={newThreshold.unit}
            onChange={(e) =>
              setNewThreshold({
                ...newThreshold,
                unit: e.target.value,
              })
            }
          />
          <Button onClick={handleAddThreshold}>Add</Button>
        </div>
      </CardContent>
    </Card>
  );
}
