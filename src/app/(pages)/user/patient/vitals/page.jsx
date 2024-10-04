"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ArrowLeft,
  Heart,
  Thermometer,
  Wind,
  Activity,
  Droplet,
} from "lucide-react";

export default function PatientVitalsPage() {
  // Mock patient data
  const patient = {
    id: 1,
    name: "Emily Johnson",
    age: 42,
    gender: "Female",
    bloodType: "A+",
    primaryCondition: "Type 2 Diabetes",
    status: "Stable",
  };

  // Mock vitals data
  const currentVitals = {
    bloodPressure: { systolic: 120, diastolic: 80 },
    heartRate: 72,
    temperature: 98.6,
    respiratoryRate: 14,
    oxygenSaturation: 98,
    bloodGlucose: 110,
  };

  // Mock historical vitals data
  const historicalVitals = [
    {
      date: "2023-09-01",
      systolic: 118,
      diastolic: 78,
      heartRate: 70,
      temperature: 98.4,
      respiratoryRate: 14,
      oxygenSaturation: 97,
      bloodGlucose: 105,
    },
    {
      date: "2023-09-08",
      systolic: 122,
      diastolic: 82,
      heartRate: 74,
      temperature: 98.7,
      respiratoryRate: 15,
      oxygenSaturation: 98,
      bloodGlucose: 115,
    },
    {
      date: "2023-09-15",
      systolic: 120,
      diastolic: 80,
      heartRate: 72,
      temperature: 98.6,
      respiratoryRate: 14,
      oxygenSaturation: 98,
      bloodGlucose: 110,
    },
    {
      date: "2023-09-22",
      systolic: 124,
      diastolic: 84,
      heartRate: 76,
      temperature: 98.8,
      respiratoryRate: 16,
      oxygenSaturation: 99,
      bloodGlucose: 120,
    },
    {
      date: "2023-09-29",
      systolic: 120,
      diastolic: 80,
      heartRate: 72,
      temperature: 98.6,
      respiratoryRate: 14,
      oxygenSaturation: 98,
      bloodGlucose: 110,
    },
  ];

  const renderLineChart = (dataKey, color, unit) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={historicalVitals}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          activeDot={{ r: 8 }}
          unit={unit}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Patient Vitals</h1>
          </div>
          <Button>Record New Vitals</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${patient.name}`}
                    alt={patient.name}
                  />
                  <AvatarFallback>
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{patient.name}</CardTitle>
                  <CardDescription>
                    {patient.age} years old • {patient.gender} •{" "}
                    {patient.bloodType}
                  </CardDescription>
                  <Badge
                    variant={
                      patient.status === "Stable"
                        ? "secondary"
                        : patient.status === "Needs Attention"
                        ? "warning"
                        : patient.status === "Critical"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {patient.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Current Vitals</CardTitle>
              <CardDescription>
                Last recorded: {new Date().toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Blood Pressure
                    </p>
                    <p className="text-lg font-semibold">
                      {currentVitals.bloodPressure.systolic}/
                      {currentVitals.bloodPressure.diastolic} mmHg
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Heart Rate
                    </p>
                    <p className="text-lg font-semibold">
                      {currentVitals.heartRate} bpm
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Temperature
                    </p>
                    <p className="text-lg font-semibold">
                      {currentVitals.temperature}°F
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Respiratory Rate
                    </p>
                    <p className="text-lg font-semibold">
                      {currentVitals.respiratoryRate} breaths/min
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplet className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Oxygen Saturation
                    </p>
                    <p className="text-lg font-semibold">
                      {currentVitals.oxygenSaturation}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Blood Glucose
                    </p>
                    <p className="text-lg font-semibold">
                      {currentVitals.bloodGlucose} mg/dL
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vitals History</CardTitle>
              <CardDescription>Trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bloodPressure">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                  <TabsTrigger value="bloodPressure">
                    Blood Pressure
                  </TabsTrigger>
                  <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
                  <TabsTrigger value="temperature">Temperature</TabsTrigger>
                  <TabsTrigger value="respiratoryRate">
                    Respiratory Rate
                  </TabsTrigger>
                  <TabsTrigger value="oxygenSaturation">
                    Oxygen Saturation
                  </TabsTrigger>
                  <TabsTrigger value="bloodGlucose">Blood Glucose</TabsTrigger>
                </TabsList>
                <TabsContent value="bloodPressure">
                  <Card>
                    <CardHeader>
                      <CardTitle>Blood Pressure History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderLineChart("systolic", "#8884d8", " mmHg")}
                      {renderLineChart("diastolic", "#82ca9d", " mmHg")}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="heartRate">
                  <Card>
                    <CardHeader>
                      <CardTitle>Heart Rate History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderLineChart("heartRate", "#8884d8", " bpm")}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="temperature">
                  <Card>
                    <CardHeader>
                      <CardTitle>Temperature History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderLineChart("temperature", "#ffc658", "°F")}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="respiratoryRate">
                  <Card>
                    <CardHeader>
                      <CardTitle>Respiratory Rate History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderLineChart(
                        "respiratoryRate",
                        "#82ca9d",
                        " breaths/min"
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="oxygenSaturation">
                  <Card>
                    <CardHeader>
                      <CardTitle>Oxygen Saturation History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderLineChart("oxygenSaturation", "#8884d8", "%")}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="bloodGlucose">
                  <Card>
                    <CardHeader>
                      <CardTitle>Blood Glucose History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderLineChart("bloodGlucose", "#ffc658", " mg/dL")}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Vitals Log</CardTitle>
              <CardDescription>
                Detailed history of recorded vitals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Blood Pressure</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Respiratory Rate</TableHead>
                    <TableHead>Oxygen Saturation</TableHead>
                    <TableHead>Blood Glucose</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicalVitals.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        {record.systolic}/{record.diastolic} mmHg
                      </TableCell>
                      <TableCell>{record.heartRate} bpm</TableCell>
                      <TableCell>{record.temperature}°F</TableCell>
                      <TableCell>
                        {record.respiratoryRate} breaths/min
                      </TableCell>
                      <TableCell>{record.oxygenSaturation}%</TableCell>
                      <TableCell>{record.bloodGlucose} mg/dL</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
