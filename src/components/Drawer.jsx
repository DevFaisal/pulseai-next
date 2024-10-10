"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ActionDrawer({ patient }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>View Vitals</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Vitals for {patient.name}</DrawerTitle>
          <DrawerDescription>View and manage patient vitals</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-fit px-4">
          <Tabs defaultValue="bloodPressure">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-5">
              <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
              <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
              <TabsTrigger value="bloodGlucose">Blood Glucose</TabsTrigger>
              <TabsTrigger value="bodyTemperature">
                Body Temperature
              </TabsTrigger>
              <TabsTrigger value="oxygenSaturation">
                Oxygen Saturation
              </TabsTrigger>
              <TabsTrigger value="respiratoryRate">
                Respiratory Rate
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bloodPressure">
              <VitalsChart
                title="Blood Pressure"
                data={patient.vitals.bloodPressure}
                dataKeys={[
                  { key: "systolic", color: "#8884d8", name: "Systolic" },
                  { key: "diastolic", color: "#82ca9d", name: "Diastolic" },
                ]}
                yAxisLabel="mmHg"
              />
            </TabsContent>
            <TabsContent value="heartRate">
              <VitalsChart
                title="Heart Rate"
                data={patient.vitals.heartRate}
                dataKeys={[{ key: "value", color: "#ff7300", name: "BPM" }]}
                yAxisLabel="BPM"
              />
            </TabsContent>
            <TabsContent value="bloodGlucose">
              <VitalsChart
                title="Blood Glucose"
                data={patient.vitals.bloodGlucose}
                dataKeys={[{ key: "value", color: "#8884d8", name: "mg/dL" }]}
                yAxisLabel="mg/dL"
              />
            </TabsContent>
            <TabsContent value="bodyTemperature">
              <VitalsChart
                title="Body Temperature"
                data={patient.vitals.bodyTemperature}
                dataKeys={[{ key: "value", color: "#ff7300", name: "°F" }]}
                yAxisLabel="°F"
              />
            </TabsContent>
            <TabsContent value="oxygenSaturation">
              <VitalsChart
                title="Oxygen Saturation"
                data={patient.vitals.oxygenSaturation}
                dataKeys={[{ key: "value", color: "#82ca9d", name: "%" }]}
                yAxisLabel="%"
              />
            </TabsContent>
            <TabsContent value="respiratoryRate">
              <VitalsChart
                title="Respiratory Rate"
                data={patient.vitals.respiratoryRate}
                dataKeys={[
                  { key: "value", color: "#8884d8", name: "breaths/min" },
                ]}
                yAxisLabel="breaths/min"
              />
            </TabsContent>
          </Tabs>
        </ScrollArea>
        <DrawerFooter>
          <DrawerClose asChild>
            {/* <div>
              <Button variant="outline">Close</Button>
            </div> */}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function VitalsChart({ title, data, dataKeys, yAxisLabel }) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis
            label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          {dataKeys.map(({ key, color, name }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={name}
              stroke={color}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Mock data for demonstration
const mockPatient = {
  name: "John Doe",
  vitals: {
    bloodPressure: [
      { time: "08:00", systolic: 120, diastolic: 80 },
      { time: "12:00", systolic: 122, diastolic: 82 },
      { time: "16:00", systolic: 118, diastolic: 79 },
      { time: "20:00", systolic: 121, diastolic: 81 },
    ],
    heartRate: [
      { time: "08:00", value: 72 },
      { time: "12:00", value: 75 },
      { time: "16:00", value: 70 },
      { time: "20:00", value: 73 },
    ],
    bloodGlucose: [
      { time: "08:00", value: 95 },
      { time: "12:00", value: 110 },
      { time: "16:00", value: 98 },
      { time: "20:00", value: 105 },
    ],
    bodyTemperature: [
      { time: "08:00", value: 98.6 },
      { time: "12:00", value: 98.8 },
      { time: "16:00", value: 98.7 },
      { time: "20:00", value: 98.9 },
    ],
    oxygenSaturation: [
      { time: "08:00", value: 98 },
      { time: "12:00", value: 97 },
      { time: "16:00", value: 98 },
      { time: "20:00", value: 99 },
    ],
    respiratoryRate: [
      { time: "08:00", value: 14 },
      { time: "12:00", value: 16 },
      { time: "16:00", value: 15 },
      { time: "20:00", value: 14 },
    ],
  },
};

// Usage example
export function VitalsDrawerExample() {
  return <ActionDrawer patient={mockPatient} />;
}
